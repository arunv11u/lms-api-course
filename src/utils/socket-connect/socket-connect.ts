import { Server } from "socket.io";
import {
	Server as HttpServer
} from "http";
import { CorsOptionsDelegate } from "cors";
import { SocketConnectionError } from "@arunvaradharajalu/common.errors";
import {
	winstonLogger,
} from "../winston";
import {
	corsOptions
} from "../cors";
import {
	SocketConnect,
	Winston
} from "../types";
import { CourseSocket } from "../../course/interfaces";


class SocketConnectImpl implements SocketConnect {
	private _io: Server | null = null;
	private _winston: Winston;
	private _path: string;

	constructor() {
		this._winston = winstonLogger.winston;
		this._path = "/socket";
	}

	get io(): Server {
		if (!this._io)
			throw new SocketConnectionError("Cannnot get io before initialization.");

		return this._io;
	}

	set path(path: string) {
		this._path = path;
	}

	init(httpServer: HttpServer): void {
		this._io = new Server(httpServer, {
			cors: corsOptions as CorsOptionsDelegate,
			path: this._path
		});
	}

	connect(): void {
		try {
			if (!this._io)
				throw new SocketConnectionError("Socket connect must be initialized before connect. To initialize, call init method, first.");

			this._io.on("connection", (socket) => {
				this._winston.info(`${socket.id}, Socket connected.`);
			});

			const courseSocket = new CourseSocket(this._io as Server);
			courseSocket.connect();
		} catch (error) {
			this._winston.error("Error in connecting to the socket");
		}
	}
}

const socketConnect = new SocketConnectImpl();

export {
	SocketConnectImpl,
	socketConnect
};