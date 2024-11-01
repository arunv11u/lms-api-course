import { Namespace, Server } from "socket.io";
import { FormattedError, socketErrorHandler } from "@arunvaradharajalu/common.errors";
import { ErrorCodes, GenericError, UnitOfWorkImpl, Winston, winstonLogger } from "../../../utils";
import { courseSocketNamespace, getCourseFactory } from "../../../global-config";
import { TokenRepository } from "../../../token";
import { UpdateLectureWatchDurationRequestDTOImpl, UpdateLectureWatchDurationUseCase } from "../../application";


class CourseSocket {
	private _io: Namespace;
	private _namespace: string = courseSocketNamespace;
	private _winston: Winston;

	constructor(io: Server) {
		this._winston = winstonLogger.winston;
		this._io = io.of(this._namespace);
	}

	get io(): Namespace {
		return this._io;
	}

	private async _updateLectureWatchDuration(
		this: { studentId: string },
		data: {
			courseId: string | null,
			lectureId: string | null,
			watchDuration: number | null
		},
		next: (error: FormattedError | null, response: null) => void
	): Promise<void> {
		try {
			if (!data.courseId)
				throw new GenericError({
					code: ErrorCodes.courseIdRequired,
					error: new Error("Course id is required"),
					errorCode: 400
				});

			if (!data.lectureId)
				throw new GenericError({
					code: ErrorCodes.courseLectureIdRequired,
					error: new Error("Course, Lecture id is required"),
					errorCode: 400
				});

			if (!data.watchDuration)
				throw new GenericError({
					code: ErrorCodes.courseLectureWatchDurationRequired,
					error: new Error("Course, Lecture watch duration is required"),
					errorCode: 400
				});

			const updateLectureWatchDurationUseCase = getCourseFactory()
				.make("UpdateLectureWatchDurationUseCase") as UpdateLectureWatchDurationUseCase;

			const updateLectureWatchDurationRequestDTO = 
				new UpdateLectureWatchDurationRequestDTOImpl();
			updateLectureWatchDurationRequestDTO.courseId = data.courseId;
			updateLectureWatchDurationRequestDTO.duration = data.watchDuration;
			updateLectureWatchDurationRequestDTO.lectureId = data.lectureId;
			updateLectureWatchDurationRequestDTO.studentId = this.studentId;

			updateLectureWatchDurationUseCase
				.updateLectureWatchDurationRequestDTO = 
					updateLectureWatchDurationRequestDTO;
			await updateLectureWatchDurationUseCase.execute();

			next(null, null);
		} catch (error) {
			next(socketErrorHandler(error), null);
		}
	}

	connect(): void {
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			this._io.on("connection", async (socket) => {
				try {
					this._winston.info("User trying to connect to the course socket namespace.");
					const token = socket.handshake.headers.authorization;
					if (!token)
						throw new GenericError({
							code: ErrorCodes.invalidAuthorizationToken,
							error: new Error("Invalid authorization token"),
							errorCode: 400
						});

					const unitOfWork = new UnitOfWorkImpl();
					const tokenRepository = unitOfWork
						.getRepository("TokenRepository") as TokenRepository;
					const { id: studentId } = await tokenRepository
						.validateStudentAuthorizationToken(
							token
						);

					this._winston.info(`${socket.id}, course socket namespace connected.`);

					socket.on("update-lecture-watch-duration", this._updateLectureWatchDuration.bind({ studentId: studentId }));
				} catch (error) {
					throw socketErrorHandler(error);
				}
			});
		} catch (error) {
			this._winston.error("Error in connecting to the course socket");
		}
	}
}

export {
	CourseSocket
};