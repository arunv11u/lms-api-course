import { getPaymentFactory } from "../../../../global-config";
import {
	CustomConsumerMessage,
	ErrorCodes,
	GenericError,
	getMongoDBRepository,
	messagingClient,
	MessagingClient,
	MessagingListener,
	MessagingTopics,
	winstonLogger
} from "../../../../utils";
import {
	ProcessStripeCheckoutCompletedEventRequestDTOImpl,
	ProcessStripeCheckoutCompletedEventUseCase
} from "../../../application";
import { StripeCheckoutCompletedRegistryRepositoryImpl } from "../../persistence";
import { StripeCheckoutCompletedEvent } from "../event";




export class StripeCheckoutCompletedListener extends
	MessagingListener<StripeCheckoutCompletedEvent> {

	topic: MessagingTopics.stripeCheckoutCompletedEvent =
		MessagingTopics.stripeCheckoutCompletedEvent;
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
		message: CustomConsumerMessage<StripeCheckoutCompletedEvent>
	): Promise<void> {
		const { value } = message;

		if (!value) throw new GenericError({
			code: ErrorCodes.messageEmptyInMessagingListener,
			error: new Error("Message was empty in stripe checkout completed listener"),
			errorCode: 500
		});

		const stripeCheckoutCompletedRegistryRepository =
			new StripeCheckoutCompletedRegistryRepositoryImpl(
				getMongoDBRepository()
			);

		if (
			await stripeCheckoutCompletedRegistryRepository
				.hasCheckoutCompletedWithId(value.id)
		) {
			winstonLogger.winston.info("Skipping stripe checkout completed event because it already exists");

			return;
		}

		const paymentFactory = getPaymentFactory();
		const processStripeCheckoutCompletedEventUseCase = paymentFactory
			.make("ProcessStripeCheckoutCompletedEventUseCase") as ProcessStripeCheckoutCompletedEventUseCase;

		const processStripeCheckoutCompletedEventRequestDTO =
			new ProcessStripeCheckoutCompletedEventRequestDTOImpl();
		processStripeCheckoutCompletedEventRequestDTO.id = value.id;
		processStripeCheckoutCompletedEventRequestDTO.orderId = value.orderId;
		processStripeCheckoutCompletedEventRequestDTO.version = value.version;

		processStripeCheckoutCompletedEventUseCase
			.processStripeCheckoutCompletedEventRequestDTO =
			processStripeCheckoutCompletedEventRequestDTO;

		await processStripeCheckoutCompletedEventUseCase.execute();
	}
}