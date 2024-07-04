import path from "path";
import { Environment } from "../types";


export const testConfig = {
	NODE_ENV: Environment.TEST,
	mongodbURL: process.env.MONGO_URI,
	mongodbDatabaseName: "lms-test",
	mongodbUsername: "testUsername",
	mongodbPassword: "testPassword",
	combinedLogPath: path.join(__dirname, "../", "logs/combined.log"),
	errorLogPath: path.join(__dirname, "../", "logs/error.log")
};