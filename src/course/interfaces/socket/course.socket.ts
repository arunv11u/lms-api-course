import { Namespace, Server } from "socket.io";
import { Winston, winstonLogger } from "../../../utils";
import { getCourseFactory } from "../../../global-config";


class CourseSocket {
	private _io: Namespace;
	private _namespace: string = "/course";
	private _winston: Winston;

	constructor(io: Server) {
		this._winston = winstonLogger.winston;
		this._io = io.of(this._namespace);
	}

	get io(): Namespace {
		return this._io;
	}

	private async _updateLectureWatchDuration(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		data: {
			courseId: string, 
			lectureId: string, 
			duration: number
		}
	): Promise<void> {
		// eslint-disable-next-line no-console
		console.log("Update lecture watch duration socket event :: _updateLectureWatchDuration", data);
		getCourseFactory();
	}

	connect(): void {
		try {
			this._io.on("connection", (socket) => {
				this._winston.info(`${socket.id}, course socket namespace connected.`);

				socket.on("update-lecture-watch-duration", this._updateLectureWatchDuration);
			});
		} catch (error) {
			this._winston.error("Error in connecting to the course socket");
		}
	}
}

export {
	CourseSocket
};