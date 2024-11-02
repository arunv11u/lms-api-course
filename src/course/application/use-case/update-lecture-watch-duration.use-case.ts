import { ErrorCodes, GenericError, UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { CourseObject, CourseRepository } from "../../domain";
import {
	UpdateLectureWatchDurationCreatorResponseDTOImpl,
	UpdateLectureWatchDurationRequestDTO,
	UpdateLectureWatchDurationResponseDTO,
	UpdateLectureWatchDurationResponseDTOImpl,
	UpdateLectureWatchDurationSectionLectureResponseDTOImpl,
	UpdateLectureWatchDurationSectionResponseDTOImpl
} from "../dto";
import { UpdateLectureWatchDurationUseCase } from "./update-lecture-watch-duration.use-case.type";



export class UpdateLectureWatchDurationUseCaseImpl implements
	UpdateLectureWatchDurationUseCase, CourseObject {
	private _unitOfWork: UnitOfWork;
	private _updateLectureWatchDurationRequestDTO:
		UpdateLectureWatchDurationRequestDTO;
	private _updateLectureWatchDurationResponseDTO:
		UpdateLectureWatchDurationResponseDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
		this._updateLectureWatchDurationResponseDTO =
			new UpdateLectureWatchDurationResponseDTOImpl();
	}

	set updateLectureWatchDurationRequestDTO(
		updateLectureWatchDurationRequestDTO:
			UpdateLectureWatchDurationRequestDTO
	) {
		this._updateLectureWatchDurationRequestDTO =
			updateLectureWatchDurationRequestDTO;
	}

	async execute(): Promise<UpdateLectureWatchDurationResponseDTO> {
		const courseRepository = this._unitOfWork
			.getRepository("CourseRepository") as CourseRepository;

		if (!await courseRepository
			.isStudentEnrolledForCourse(
				this._updateLectureWatchDurationRequestDTO.courseId,
				this._updateLectureWatchDurationRequestDTO.studentId
			)
		) throw new GenericError({
			code: ErrorCodes.studentNotEnrolledForCourse,
			error: new Error("Student is not enrolled for a course"),
			errorCode: 403
		});

		await courseRepository
			.updateLectureWatchDuration(
				this._updateLectureWatchDurationRequestDTO.studentId,
				this._updateLectureWatchDurationRequestDTO.courseId,
				this._updateLectureWatchDurationRequestDTO.lectureId,
				this._updateLectureWatchDurationRequestDTO.duration
			);

		const course = await courseRepository.getMyCourse(
			this._updateLectureWatchDurationRequestDTO.courseId,
			this._updateLectureWatchDurationRequestDTO.studentId
		);

		this._updateLectureWatchDurationResponseDTO.category = course.category;

		course.creators.forEach(creator => {
			const creatorResponseDTO =
				new UpdateLectureWatchDurationCreatorResponseDTOImpl();
			creatorResponseDTO.designation = creator.designation;
			creatorResponseDTO.firstName = creator.firstName;
			creatorResponseDTO.lastName = creator.lastName;
			creatorResponseDTO.profilePicture = creator.profilePicture;

			this._updateLectureWatchDurationResponseDTO
				.creators.push(creatorResponseDTO);
		});

		this._updateLectureWatchDurationResponseDTO
			.description = course.description;
		this._updateLectureWatchDurationResponseDTO.id = course.id;
		this._updateLectureWatchDurationResponseDTO.image = course.image;
		this._updateLectureWatchDurationResponseDTO
			.languages = course.languages;
		this._updateLectureWatchDurationResponseDTO
			.lastUpdatedOn = course.lastUpdatedOn;
		this._updateLectureWatchDurationResponseDTO.materialsAndOffers =
			course.materialsAndOffers;

		this._updateLectureWatchDurationResponseDTO
			.price.currency = course.price.currency;
		this._updateLectureWatchDurationResponseDTO
			.price.value = course.price.value;

		this._updateLectureWatchDurationResponseDTO.rating = null;

		course.sections.forEach(section => {
			const sectionResponseDTO =
				new UpdateLectureWatchDurationSectionResponseDTOImpl();
			sectionResponseDTO.id = section.id;

			section.lectures.forEach(lecture => {
				const lectureResponseDTO =
					// eslint-disable-next-line max-len
					new UpdateLectureWatchDurationSectionLectureResponseDTOImpl();
				lectureResponseDTO.description = lecture.description;
				lectureResponseDTO.duration = lecture.duration;
				lectureResponseDTO.id = lecture.id;
				lectureResponseDTO.link = lecture.link;
				lectureResponseDTO.order = lecture.order;
				lectureResponseDTO.thumbnail = lecture.thumbnail;
				lectureResponseDTO.title = lecture.title;

				sectionResponseDTO.lectures.push(lectureResponseDTO);
			});

			sectionResponseDTO.lecturesCount = section.lecturesCount;
			sectionResponseDTO.lecturesDuration = section.lecturesDuration;
			sectionResponseDTO.order = section.order;
			sectionResponseDTO.title = section.title;

			this._updateLectureWatchDurationResponseDTO.sections
				.push(sectionResponseDTO);
		});

		this._updateLectureWatchDurationResponseDTO.status = course.status;
		this._updateLectureWatchDurationResponseDTO
			.subtitles = course.subtitles;
		this._updateLectureWatchDurationResponseDTO.title = course.title;
		this._updateLectureWatchDurationResponseDTO
			.totalDuration = course.totalDuration;
		this._updateLectureWatchDurationResponseDTO.totalLecturesCount =
			course.totalLecturesCount;
		this._updateLectureWatchDurationResponseDTO
			.totalStudents = course.totalStudents;

		return this._updateLectureWatchDurationResponseDTO;
	}
}