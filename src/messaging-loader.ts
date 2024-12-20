/* eslint-disable indent */
/* eslint-disable max-classes-per-file */
import nconf from "nconf";
import {
	CompressionCodecs,
	CompressionTypes,
	ConsumerConfig,
	ConsumerRunConfig,
	Partitioners,
	ProducerConfig
} from "kafkajs";
import {
	MessagingListener,
	MessagingTopics,
	Winston,
	winstonLogger
} from "./utils";
import {
	StudentCreatedListener,
	StudentUpdatedListener
} from "./student";
import { 
	InstructorCreatedListener, 
	InstructorUpdatedListener 
} from "./instructor";
import { CourseTranscodingCompletedListener } from "./course";
import { StripeCheckoutCompletedListener } from "./payment";



class MessagingLoaderImpl {

	private _clientId: string;
	private _producerConfig: ProducerConfig;
	private _consumerConfig: ConsumerConfig;
	private _consumerRunConfig: ConsumerRunConfig;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private _listeners: MessagingListener<{ topic: string, data: any }>[];
	private _studentCreatedListener = new StudentCreatedListener();
	private _studentUpdatedListener = new StudentUpdatedListener();
	private _instructorCreatedListener = new InstructorCreatedListener();
	private _instructorUpdatedListener = new InstructorUpdatedListener();
	private _courseTranscodingCompletedListener = 
		new CourseTranscodingCompletedListener();
	private _stripeCheckoutCompletedListener = 
		new StripeCheckoutCompletedListener();
	private _winston: Winston;

	constructor() {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const SnappyCodec = require("kafkajs-snappy");
		CompressionCodecs[CompressionTypes.Snappy] = SnappyCodec;

		this._winston = winstonLogger.winston;

		this._clientId = "course-service";

		this._listeners = [
			this._studentCreatedListener,
			this._studentUpdatedListener,
			this._instructorCreatedListener,
			this._instructorUpdatedListener,
			this._courseTranscodingCompletedListener,
			this._stripeCheckoutCompletedListener
		];

		this._producerConfig = {
			createPartitioner: Partitioners.LegacyPartitioner,
			maxInFlightRequests: 5,
			retry: {
				retries: 5,
				initialRetryTime: 500,
				maxRetryTime: 60000,
				factor: 2,
				multiplier: 1.5
			}
		};

		this._consumerConfig = {
			groupId: nconf.get("messagingConsumerGroupId"),
			allowAutoTopicCreation: false
		};

		this._consumerRunConfig = {
			autoCommitThreshold: 1,
			partitionsConsumedConcurrently: 3,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			eachMessage: async ({ topic, partition, message, heartbeat }) => {
				this._winston.info("Message received ::", { topic, partition, message });
				if (message && message.value) {
					this._winston.debug(`${{
						value: message.value.toString(),
						headers: message.headers,
					}}`);

					switch (topic) {
						case MessagingTopics.studentCreatedEvent: {
							this._winston.info("Student created event listener called :");

							await this._studentCreatedListener
								.listen(message);

							break;
						}

						case MessagingTopics.studentUpdatedEvent: {
							this._winston.info("Student updated event listener called :");

							await this._studentUpdatedListener
								.listen(message);

							break;
						}

						case MessagingTopics.instructorCreatedEvent: {
							this._winston.info("Instructor created event listener called :");

							await this._instructorCreatedListener
								.listen(message);

							break;
						}

						case MessagingTopics.instructorUpdatedEvent: {
							this._winston.info("Instructor updated event listener called :");

							await this._instructorUpdatedListener
								.listen(message);

							break;
						}

						case MessagingTopics.courseTranscodingCompletedEvent: {
							this._winston.info("Course transcoding completed event listener called :");

							await this._courseTranscodingCompletedListener
								.listen(message);

							break;
						}

						case MessagingTopics.stripeCheckoutCompletedEvent: {
							this._winston.info("Stripe checkout completed event listener called :");

							await this._stripeCheckoutCompletedListener
								.listen(message);

							break;
						}

						default: {
							this._winston.error("Topic is not listed in consumer run config");
						}
					}

					this._winston.info("consumer offset about to be commited ::", { topic, partition, offset: message.offset });
				}
			}
		};
	}

	get clientId(): string {
		return this._clientId;
	}

	get producerConfig(): ProducerConfig {
		return this._producerConfig;
	}

	get consumerConfig(): ConsumerConfig {
		return this._consumerConfig;
	}

	get consumerRunConfig(): ConsumerRunConfig {
		return this._consumerRunConfig;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	get listeners(): MessagingListener<{ topic: string, data: any }>[] {
		return this._listeners;
	}
}

export {
	MessagingLoaderImpl
};