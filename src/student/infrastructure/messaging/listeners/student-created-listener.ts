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
import { 
	ProcessStudentCreatedEventUseCase, 
	StudentCreatedEventRequestDTOImpl 
} from "../../../application";
import { StudentRepositoryImpl } from "../../persistence";
import { StudentCreatedEvent } from "../event";



export class StaffCreatedListener extends
	MessagingListener<StudentCreatedEvent> {

	topic = MessagingTopics.studentCreatedEvent;
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
		message: CustomConsumerMessage<StudentCreatedEvent>
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

			if (student) {
				winstonLogger.winston.info("Skipping student created event because the student already exists");

				return;
			}

			const studentFactory = getStudentFactory();
			const processStudentCreatedEventUseCase = studentFactory
				.make("ProcessStudentCreatedEventUseCase") as ProcessStudentCreatedEventUseCase;

			const studentCreatedEventRequestDTO =
				new StudentCreatedEventRequestDTOImpl();
			studentCreatedEventRequestDTO.email = value.email;
			studentCreatedEventRequestDTO.firstName = value.firstName;
			studentCreatedEventRequestDTO.id = value.id;
			studentCreatedEventRequestDTO.lastName = value.lastName;
			studentCreatedEventRequestDTO.userId = value.userId;
			studentCreatedEventRequestDTO.version = value.version;

			processStudentCreatedEventUseCase.studentCreatedEventRequestDTO =
				studentCreatedEventRequestDTO;

			await processStudentCreatedEventUseCase.execute();
		} catch (error) {
			winstonLogger.winston.error("Error in student created listener :", error);

			throw error;
		}
	}
}