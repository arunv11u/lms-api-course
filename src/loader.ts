import { Express } from "express";
import { Server } from "http";
import nconf from "nconf";
import { mongoDBConnect } from "@arunvaradharajalu/common.mongodb-api";
import {
	DefaultConfig,
	Environment,
	Loader,
	LogPath,
	config,
	devConfig,
	messagingClient,
	prodConfig,
	socketConnect,
	stagingConfig,
	testConfig,
	unhandledErrorHandler,
	winstonLogger
} from "./utils";
import { routes } from "./routes";
import { sockets } from "./socket";
import { MessagingLoaderImpl } from "./messaging-loader";



export class LoaderImpl implements Loader {

	async load(app: Express, server: Server): Promise<boolean> {

		const _environment = process.env.NODE_ENV as Environment;

		const _config: DefaultConfig = {
			devConfig,
			prodConfig,
			stagingConfig,
			testConfig
		};

		unhandledErrorHandler();

		config.set(_environment, _config);

		let logPath: LogPath | null = null;
		if (_environment === Environment.PRODUCTION ||
			_environment === Environment.STAGING)
			logPath = {
				combinedLogPath: nconf.get("combinedLogPath"),
				errorLogPath: nconf.get("errorLogPath")
			};

		winstonLogger.start(
			_environment,
			logPath
		);

		mongoDBConnect.url = nconf.get("mongodbURL");
		mongoDBConnect.username = nconf.get("MONGODB_USERNAME");
		mongoDBConnect.password = nconf.get("MONGODB_PASSWORD");
		mongoDBConnect.dbName = nconf.get("mongodbDatabaseName");

		mongoDBConnect.init();
		await mongoDBConnect.connect();

		await socketConnect.init(server);
		sockets.listen(socketConnect.io);


		const messagingLoader = new MessagingLoaderImpl();

		messagingClient.setup(true, true);
		messagingClient.brokers = [nconf.get("bootstrapKafkaBroker")];
		messagingClient.clientId = messagingLoader.clientId;
		messagingClient.producerConfig = messagingLoader.producerConfig;
		messagingClient.consumerConfig = messagingLoader.consumerConfig;
		messagingClient.listeners = messagingLoader.listeners;
		messagingClient.consumerRunConfig =
			messagingLoader.consumerRunConfig;

		messagingClient.init();
		await messagingClient.onConnect();
		await messagingClient.onSubscribe();

		routes.listen(app);

		return true;
	}
}
