import express from "express";
import { Server } from "http";
import { LoaderImpl } from "../src/loader";
import { Environment } from "../src/utils";


describe("Loader Module", () => {
	let loader: LoaderImpl;
	const app = express();
	const server = new Server();

	beforeEach(() => {
		loader = new LoaderImpl();
	});

	describe("\"loader\" fn", () => {
		describe("Happy Path", () => {
			it(`Express application and Http Server passed as an arguments, 
        should load the necessary modules and return true`, async () => {
				const result = await loader.load(app, server);

				expect(result).toBe(true);
			});

			it.skip("If environment is production, should do logs", async () => {
				process.env.NODE_ENV = Environment.PRODUCTION;

				const result = await loader.load(app, server);

				expect(result).toBe(true);

				process.env.NODE_ENV = Environment.TEST;
			});
		});
	});
});