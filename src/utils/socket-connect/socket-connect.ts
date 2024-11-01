import { Server } from "socket.io";
import { createClient } from "redis";
import {
	Server as HttpServer
} from "http";
import { CorsOptionsDelegate } from "cors";
import { createAdapter } from "@socket.io/redis-adapter";
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

	async init(httpServer: HttpServer): Promise<void> {
		const pubClient = createClient({ url: "redis://redis:6379" });
		const subClient = pubClient.duplicate();

		await Promise.all([
			pubClient.connect(),
			subClient.connect()
		]);

		this._io = new Server(httpServer, {
			cors: corsOptions as CorsOptionsDelegate,
			path: this._path,
			adapter: createAdapter(pubClient, subClient)
		});
	}

	connect(): void {
		try {
			if (!this._io)
				throw new SocketConnectionError("Socket connect must be initialized before connect. To initialize, call init method, first.");

			this._io.on("connection", (socket) => {
				this._winston.info(`${socket.id}, Socket connected.`);
			});
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