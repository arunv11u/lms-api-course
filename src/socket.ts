import {
	Socket
} from "./utils";

class SocketImpl implements Socket {

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	listen(): boolean {
		
		return true;
	}
}

const sockets = new SocketImpl();

export {
	sockets
};