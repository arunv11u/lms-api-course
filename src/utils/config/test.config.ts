import path from "path";
import { Environment } from "../types";


export const testConfig = {
	NODE_ENV: Environment.TEST,
	MONGODB_USERNAME: "testUsername",
	MONGODB_PASSWORD: "testPassword",
	mongodbURL: process.env.MONGO_URI,
	mongodbDatabaseName: "lms-test",
	combinedLogPath: path.join(__dirname, "../", "logs/combined.log"),
	errorLogPath: path.join(__dirname, "../", "logs/error.log")
};