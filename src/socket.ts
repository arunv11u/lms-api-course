import { Server } from "socket.io";
import { CourseSocket } from "./course/interfaces";
import {
	Socket
} from "./utils";

class SocketImpl implements Socket {

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	listen(io: Server): boolean {
		
		const courseSocket = new CourseSocket(io);
		courseSocket.connect();

		return true;
	}
}

const sockets = new SocketImpl();

export {
	sockets
};