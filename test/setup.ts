/* eslint-disable no-console */
import dotenv from "dotenv";
import nconf from "nconf";
import { DefaultConfig, Environment } from "../src/utils/types";
import { config, testConfig } from "../src/utils/config";
import { winstonLogger } from "../src/utils/winston";
import { mongoDBConnect } from "@arunvaradharajalu/common.mongodb-api";




beforeAll(async () => {
	dotenv.config({ path: ".env.test" });

	const _environment = process.env.NODE_ENV as Environment;
	const _config: DefaultConfig = {
		prodConfig: {},
		testConfig: testConfig
	};
	config.set(_environment, _config);

	winstonLogger.start(
		_environment
	);

	mongoDBConnect.url = nconf.get("mongodbURL");
	mongoDBConnect.username = testConfig.mongodbUsername;
	mongoDBConnect.password = testConfig.mongodbPassword;
	mongoDBConnect.dbName = testConfig.mongodbDatabaseName;

	try {
		mongoDBConnect.init();
		await mongoDBConnect.connect();
	} catch (error) {
		console.error("db connect :: error ::", error);
	}
});

beforeEach(async () => {
	const client = mongoDBConnect.mongoClient;
	const collections = await client
		.db(testConfig.mongodbDatabaseName)
		.collections();

	for (const collection of collections) {
		await collection.deleteMany({});
	}
});


afterAll(async () => {
	const client = mongoDBConnect.mongoClient;
	await client.close();
});
