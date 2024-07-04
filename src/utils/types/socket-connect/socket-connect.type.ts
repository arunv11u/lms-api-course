import {
	Server as HttpServer
} from "http";
import { Server } from "socket.io";



export abstract class SocketConnect {
	abstract get io(): Server;
	abstract set path(path: string);

	abstract init(httpServer: HttpServer): void;
	abstract connect(): void;
}
