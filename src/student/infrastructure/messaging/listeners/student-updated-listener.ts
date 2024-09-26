import { getStudentFactory } from "../../../../global-config";
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
import { ProcessStudentUpdatedEventUseCase, StudentUpdatedEventRequestDTOImpl } from "../../../application";
import { StudentRepositoryImpl } from "../../persistence";
import { StudentUpdatedEvent } from "../event";



export class StudentUpdatedListener extends
	MessagingListener<StudentUpdatedEvent> {

	topic: MessagingTopics.studentUpdatedEvent =
		MessagingTopics.studentUpdatedEvent;
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
		message: CustomConsumerMessage<StudentUpdatedEvent>
	): Promise<void> {

		try {
			const { value } = message;

			if (!value) throw new GenericError({
				code: ErrorCodes.messageEmptyInMessagingListener,
				error: new Error("Message was empty in student created listener"),
				errorCode: 500
			});


			const studentRepository = new StudentRepositoryImpl();
			studentRepository.mongoDBRepository = getMongoDBRepository();

			const student = await studentRepository
				.get(value.id);

			if (!student)
				throw new GenericError({
					code: ErrorCodes.studentNotFound,
					error: new Error("Student not found"),
					errorCode: 400
				});

			if (student.version === value.version) {
				winstonLogger.winston.info("Skipping student created event because the student already exists");

				return;
			}

			if (value.version !== student.version + 1)
				throw new GenericError({
					code: ErrorCodes.studentVersionDidNotMatch,
					error: new Error("Student version did not match"),
					errorCode: 400
				});

			const studentFactory = getStudentFactory();
			const processStudentUpdatedEventUseCase = studentFactory
				.make("ProcessStudentUpdatedEventUseCase") as ProcessStudentUpdatedEventUseCase;

			const studentUpdatedEventRequestDTO =
				new StudentUpdatedEventRequestDTOImpl();
			studentUpdatedEventRequestDTO.email = value.email;
			studentUpdatedEventRequestDTO.firstName = value.firstName;
			studentUpdatedEventRequestDTO.id = value.id;
			studentUpdatedEventRequestDTO.lastName = value.lastName;
			studentUpdatedEventRequestDTO.profilePicture = value.profilePicture;
			studentUpdatedEventRequestDTO.userId = value.userId;
			studentUpdatedEventRequestDTO.version = value.version;

			processStudentUpdatedEventUseCase.studentUpdatedEventRequestDTO =
				studentUpdatedEventRequestDTO;

			await processStudentUpdatedEventUseCase.execute();
		} catch (error) {
			winstonLogger.winston.error("Error in student updated listener :", error);

			throw error;
		}
	}
}