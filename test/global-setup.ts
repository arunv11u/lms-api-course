/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { MongoMemoryReplSet } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import { testConfig } from "../src/utils";


export default async function globalSetup() {
	try {
		const replSet = await MongoMemoryReplSet.create({
			replSet: {
				count: 1,
				storageEngine: "wiredTiger",
				auth: {
					customRootName: testConfig.MONGODB_USERNAME,
					customRootPwd: testConfig.MONGODB_PASSWORD
				}
			}
		});

		await replSet.waitUntilRunning();

		const uri = replSet.getUri();
		process.env.MONGO_URI = uri;
		(global as any).__MONGOINSTANCE = replSet;


		process.env.MONGO_URI = `${process.env.MONGO_URI}`;
		process.env.database = testConfig.mongodbDatabaseName;

		const client = new MongoClient(
			`${process.env.MONGO_URI}`,
			{
				auth: { 
					username: testConfig.MONGODB_USERNAME, 
					password: testConfig.MONGODB_PASSWORD 
				},
			}
		);

		await client.connect();

		const db = client.db(testConfig.mongodbDatabaseName);
		await db.dropDatabase();
		await client.close();

		return true;
	} catch (error) {
		console.error("Error in test global setup :", error);
	}
}
