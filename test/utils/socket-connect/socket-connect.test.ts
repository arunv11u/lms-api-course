import {
	Server
} from "http";
import { Socket, connect } from "socket.io-client";
import { SocketConnectionError } from "@arunvaradharajalu/common.errors";
import { SocketConnect, SocketConnectImpl } from "../../../src/utils";



describe("Socket connect module", () => {
	const socketPort = 7000;
	let socketConnect: SocketConnect;
	let clientSocket: Socket;

	beforeEach(() => {
		socketConnect = new SocketConnectImpl();
		clientSocket = connect(`http://localhost:${socketPort}`, {
			path: "/socket"
		});
	});

	describe("\"io\" getter", () => {
		describe("Exception Path", () => {
			it("If io is not initialised, should throw error", () => {
				expect(() => socketConnect.io).toThrow(SocketConnectionError);
			});

			it("If socket is initialised, should return io", () => {
				const server = new Server();

				socketConnect.init(server);

				expect(socketConnect.io).toBeTruthy();
			});
		});
	});

	describe("\"init\" method", () => {
		describe("Happy Path", () => {
			it("If http server is passed, should initialize the socket server and set the io state", () => {
				const server = new Server();

				socketConnect.init(server);
			});
		});
	});

	describe("\"connect\"", () => {
		describe("Exception Path", () => {
			it("If io is not initialized, should throw error", () => {
				socketConnect.path = "/socket";

				expect(() => socketConnect.connect())
					.toThrow(SocketConnectionError);
				expect(() => socketConnect.connect()).toThrow("Socket connect must be initialized before connect. To initialize, call init method, first.");
			});
		});

		describe("Happt Path", () => {
			it("Should able to start the socket connection", async () => {
				const server = new Server();
				socketConnect.path = "/socket";

				socketConnect.init(server);

				const spyOn = jest.spyOn(socketConnect.io, "on");

				server.listen(7000, () => {
					socketConnect.connect();

					clientSocket.on("connect", () => {
						// eslint-disable-next-line no-console
						console.log("Client Socket");
					});

					expect(spyOn).toHaveBeenCalled();
				});

				await new Promise((resolve) => {
					setTimeout(() => resolve(true), 300);
				});

				server.close();
			});
		});
	});
});