import { Server } from "socket.io";

interface Socket {
	listen(io: Server): boolean;
}

export {
	Socket
};
