import { getInstructorFactory } from "../../../../global-config";
import {
	CustomConsumerMessage,
	ErrorCodes,
	GenericError,
	getMongoDBRepository,
	MessagingClient,
	messagingClient,
	MessagingListener,
	MessagingTopics,
	winstonLogger
} from "../../../../utils";
import { InstructorUpdatedEventRequestDTOImpl, ProcessInstructorUpdatedEventUseCase } from "../../../application";
import { InstructorRepositoryImpl } from "../../persistence";
import { InstructorUpdatedEvent } from "../event";



export class InstructorUpdatedListener extends
	MessagingListener<InstructorUpdatedEvent> {

	topic: MessagingTopics.instructorUpdatedEvent =
		MessagingTopics.instructorUpdatedEvent;
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
		message: CustomConsumerMessage<InstructorUpdatedEvent>
	): Promise<void> {

		try {
			const { value } = message;

			if (!value) throw new GenericError({
				code: ErrorCodes.messageEmptyInMessagingListener,
				error: new Error("Message was empty in student created listener"),
				errorCode: 500
			});


			const instructorRepository = new InstructorRepositoryImpl();
			instructorRepository.mongoDBRepository = getMongoDBRepository();

			const instructor = await instructorRepository
				.get(value.id);

			if (!instructor)
				throw new GenericError({
					code: ErrorCodes.studentNotFound,
					error: new Error("Student not found"),
					errorCode: 400
				});

			if (instructor.version === value.version) {
				winstonLogger.winston.info("Skipping instructor updated event because the instructor already exists");

				return;
			}

			if (value.version !== instructor.version + 1)
				throw new GenericError({
					code: ErrorCodes.instructorVersionDidNotMatch,
					error: new Error("Instructor version did not match"),
					errorCode: 400
				});

			const instructorFactory = getInstructorFactory();
			const processInstructorUpdatedEventUseCase = instructorFactory
				.make("ProcessInstructorUpdatedEventUseCase") as ProcessInstructorUpdatedEventUseCase;

			const instructorUpdatedEventRequestDTO =
				new InstructorUpdatedEventRequestDTOImpl();
			instructorUpdatedEventRequestDTO.email = value.email;
			instructorUpdatedEventRequestDTO.firstName = value.firstName;
			instructorUpdatedEventRequestDTO.id = value.id;
			instructorUpdatedEventRequestDTO.lastName = value.lastName;
			instructorUpdatedEventRequestDTO.designation = value.designation;
			instructorUpdatedEventRequestDTO.profilePicture =
				value.profilePicture;
			instructorUpdatedEventRequestDTO.userId = value.userId;
			instructorUpdatedEventRequestDTO.version = value.version;

			processInstructorUpdatedEventUseCase
				.instructorUpdatedEventRequestDTO =
				instructorUpdatedEventRequestDTO;

			await processInstructorUpdatedEventUseCase.execute();
		} catch (error) {
			winstonLogger.winston.error("Error in instructor updated listener :", error);

			throw error;
		}
	}
}