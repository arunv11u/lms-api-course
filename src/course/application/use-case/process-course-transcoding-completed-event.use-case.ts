import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { CourseObject, CourseRepository } from "../../domain";
import { ProcessCourseTranscodingCompletedEventRequestDTO } from "../dto";
import { ProcessCourseTranscodingCompletedEventUseCase } from "./process-course-transcoding-completed-event.use-case.type";



export class ProcessCourseTranscodingCompletedEventUseCaseImpl implements
	ProcessCourseTranscodingCompletedEventUseCase, CourseObject {
	private _unitOfWork: UnitOfWork;
	private _processCourseTranscodingCompletedEventRequestDTO:
		ProcessCourseTranscodingCompletedEventRequestDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
	}

	set processCourseTranscodingCompletedEventRequestDTO(
		processCourseTranscodingCompletedEventRequestDTO:
			ProcessCourseTranscodingCompletedEventRequestDTO
	) {
		this._processCourseTranscodingCompletedEventRequestDTO =
			processCourseTranscodingCompletedEventRequestDTO;
	}

	async execute(): Promise<void> {
		try {
			await this._unitOfWork.start();

			const courseRepository = this._unitOfWork
				.getRepository("CourseRepository") as CourseRepository;

			// eslint-disable-next-line max-len
			const transcodeCompletedPromises = this._processCourseTranscodingCompletedEventRequestDTO
				.payload.map(async (payload) => {
					await courseRepository.completeTranscodingForLecture(
						payload.lectureId,
						payload.lectureUrl,
						payload.thumbnailLectureUrl,
						payload.duration
					);

					return payload.lectureId;
				});

			const lectureIds = await Promise.all(transcodeCompletedPromises);

			await courseRepository
				.addTranscodedLecturesToCourseTranscodingCompletedRegistry(
					this._processCourseTranscodingCompletedEventRequestDTO.id,
					this._processCourseTranscodingCompletedEventRequestDTO
						.courseId,
					lectureIds
				);

			await this._unitOfWork.complete();
		} catch (error) {
			await this._unitOfWork.dispose();

			throw error;
		}
	}
}