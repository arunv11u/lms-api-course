import nconf from "nconf";
import { getCourseFactory } from "../../../../global-config";
import {
	CustomConsumerMessage,
	ErrorCodes,
	GenericError,
	getMongoDBRepository,
	getS3Storage,
	messagingClient,
	MessagingClient,
	MessagingListener,
	MessagingTopics,
	winstonLogger
} from "../../../../utils";
import {
	ProcessCourseTranscodingCompletedEventPayloadRequestDTOImpl,
	ProcessCourseTranscodingCompletedEventRequestDTOImpl,
	ProcessCourseTranscodingCompletedEventUseCase
} from "../../../application";
import { CourseTranscodingCompletedRegistryRepositoryImpl } from "../../persistence/course-transcoding-completed-registry.repository";
import { CourseTranscodingCompletedEvent } from "../event";



export class CourseTranscodingCompletedListener extends
	MessagingListener<CourseTranscodingCompletedEvent> {

	topic: MessagingTopics.courseTranscodingCompletedEvent =
		MessagingTopics.courseTranscodingCompletedEvent;
	fromBeginning: boolean | undefined = undefined;
	private _messagingClient: MessagingClient;

	constructor() {
		super();

		this._messagingClient = messagingClient;
	}

	async subscribe(): Promise<void> {
		this._messagingClient.consumer.subscribe({
			topic: this.topic, fromBeginning: this.fromBeginning
		});
	}

	async onMessages(
		message: CustomConsumerMessage<CourseTranscodingCompletedEvent>
	): Promise<void> {
		const { value } = message;

		if (!value) throw new GenericError({
			code: ErrorCodes.messageEmptyInMessagingListener,
			error: new Error("Message was empty in course transcoded completed listener"),
			errorCode: 500
		});

		const courseTranscodingCompletedRegistryRepository =
			new CourseTranscodingCompletedRegistryRepositoryImpl(
				getMongoDBRepository()
			);

		if (
			await courseTranscodingCompletedRegistryRepository
				.hasLecturesTranscodedWithId(value.id)
		) {
			winstonLogger.winston.info("Skipping course transcoding completed event because it already exists");

			return;
		}

		const courseFactory = getCourseFactory();
		const processCourseTranscodingCompletedEventUsecase = courseFactory
			.make("ProcessCourseTranscodingCompletedEventUseCase") as ProcessCourseTranscodingCompletedEventUseCase;

		const baseFilePath = getS3Storage(nconf.get("s3BucketName")).baseFilePath;
		const courseId = value.payload[0].playlistName.split("/courses/")[1].split("/")[0];

		const processCourseTranscodingCompletedEventRequestDTO =
			new ProcessCourseTranscodingCompletedEventRequestDTOImpl();

		processCourseTranscodingCompletedEventRequestDTO.courseId = courseId;
		processCourseTranscodingCompletedEventRequestDTO.id = value.id;

		value.payload.forEach(payload => {
			const processCourseTranscodingCompletedEventPayloadRequestDTO =
				// eslint-disable-next-line max-len
				new ProcessCourseTranscodingCompletedEventPayloadRequestDTOImpl();

			processCourseTranscodingCompletedEventPayloadRequestDTO
				.duration = payload.duration;
			processCourseTranscodingCompletedEventPayloadRequestDTO
				.lectureId = payload.lectureId;
			processCourseTranscodingCompletedEventPayloadRequestDTO
				.lectureUrl = `${baseFilePath}${payload.playlistName}.m3u8`;
			processCourseTranscodingCompletedEventPayloadRequestDTO
				.status = payload.status;

			const count = 1;
			const countPadded = count.toString().padStart(5, "0");
			const thumbnailPattern = payload.thumbnailPattern.replace("{count}", countPadded);
			processCourseTranscodingCompletedEventPayloadRequestDTO.thumbnailLectureUrl = `${baseFilePath}${thumbnailPattern}.png`;

			processCourseTranscodingCompletedEventRequestDTO.payload
				.push(processCourseTranscodingCompletedEventPayloadRequestDTO);
		});

		processCourseTranscodingCompletedEventUsecase
			.processCourseTranscodingCompletedEventRequestDTO =
			processCourseTranscodingCompletedEventRequestDTO;

		await processCourseTranscodingCompletedEventUsecase.execute();
	}
}