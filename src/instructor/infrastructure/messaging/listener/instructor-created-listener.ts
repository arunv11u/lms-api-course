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
import {
	InstructorCreatedEventRequestDTOImpl,
	ProcessInstructorCreatedEventUseCase
} from "../../../application";
import { InstructorRepositoryImpl } from "../../persistence";
import { InstructorCreatedEvent } from "../event";



export class InstructorCreatedListener extends
	MessagingListener<InstructorCreatedEvent> {

	topic: MessagingTopics.instructorCreatedEvent =
		MessagingTopics.instructorCreatedEvent;
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
		message: CustomConsumerMessage<InstructorCreatedEvent>
	): Promise<void> {

		try {
			const { value } = message;

			if (!value) throw new GenericError({
				code: ErrorCodes.messageEmptyInMessagingListener,
				error: new Error("Message was empty in instructor created listener"),
				errorCode: 500
			});


			const instructorRepository = new InstructorRepositoryImpl();
			instructorRepository.mongoDBRepository = getMongoDBRepository();

			const instructor = await instructorRepository
				.get(value.id);

			if (instructor) {
				winstonLogger.winston.info("Skipping instructor created event because the instructor already exists");

				return;
			}

			const instructorFactory = getInstructorFactory();
			const processInstructorCreatedEventUseCase = instructorFactory
				.make("ProcessInstructorCreatedEventUseCase") as ProcessInstructorCreatedEventUseCase;

			const instructorCreatedEventRequestDTO =
				new InstructorCreatedEventRequestDTOImpl();
			instructorCreatedEventRequestDTO.email = value.email;
			instructorCreatedEventRequestDTO.firstName = value.firstName;
			instructorCreatedEventRequestDTO.id = value.id;
			instructorCreatedEventRequestDTO.lastName = value.lastName;
			instructorCreatedEventRequestDTO.userId = value.userId;
			instructorCreatedEventRequestDTO.version = value.version;

			processInstructorCreatedEventUseCase
				.instructorCreatedEventRequestDTO =
				instructorCreatedEventRequestDTO;

			await processInstructorCreatedEventUseCase.execute();
		} catch (error) {
			winstonLogger.winston.error("Error in instructor created listener :", error);

			throw error;
		}
	}
}