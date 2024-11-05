import { TokenRepository } from "../../../token";
import { ErrorCodes, GenericError, UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { CourseObject, CourseRepository } from "../../domain";
import {
	GetMyCourseCreatorResponseDTOImpl,
	GetMyCourseRequestDTO,
	GetMyCourseResponseDTO,
	GetMyCourseResponseDTOImpl,
	GetMyCourseSectionLectureResponseDTOImpl,
	GetMyCourseSectionResponseDTOImpl
} from "../dto";
import { GetMyCourseUseCase } from "./get-my-course.use-case.type";



export class GetMyCourseUseCaseImpl implements
	GetMyCourseUseCase, CourseObject {
	private _unitOfWork: UnitOfWork;
	private _getMyCourseRequestDTO:
		GetMyCourseRequestDTO;
	private _getMyCourseResponseDTO:
		GetMyCourseResponseDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
		this._getMyCourseResponseDTO = new GetMyCourseResponseDTOImpl();
	}

	set getMyCourseRequestDTO(
		getMyCourseRequestDTO: GetMyCourseRequestDTO
	) {
		this._getMyCourseRequestDTO = getMyCourseRequestDTO;
	}

	async execute(): Promise<GetMyCourseResponseDTO> {
		const tokenRepository = this._unitOfWork
			.getRepository("TokenRepository") as TokenRepository;
		const courseRepository = this._unitOfWork
			.getRepository("CourseRepository") as CourseRepository;

		const { id: studentId } = await tokenRepository
			.validateStudentAuthorizationToken(
				this._getMyCourseRequestDTO.authorizationToken
			);

		if (!await courseRepository
			.isStudentEnrolledForCourse(
				this._getMyCourseRequestDTO.courseId,
				studentId
			)
		) throw new GenericError({
			code: ErrorCodes.studentNotEnrolledForCourse,
			error: new Error("Student is not enrolled for a course"),
			errorCode: 403
		});

		const course = await courseRepository.getMyCourse(
			this._getMyCourseRequestDTO.courseId,
			studentId
		);

		this._getMyCourseResponseDTO.category = course.category;

		course.creators.forEach(creator => {
			const creatorResponseDTO =
				new GetMyCourseCreatorResponseDTOImpl();
			creatorResponseDTO.designation = creator.designation;
			creatorResponseDTO.firstName = creator.firstName;
			creatorResponseDTO.lastName = creator.lastName;
			creatorResponseDTO.profilePicture = creator.profilePicture;

			this._getMyCourseResponseDTO.creators.push(creatorResponseDTO);
		});

		this._getMyCourseResponseDTO.description = course.description;
		this._getMyCourseResponseDTO.id = course.id;
		this._getMyCourseResponseDTO.image = course.image;
		this._getMyCourseResponseDTO.languages = course.languages;
		this._getMyCourseResponseDTO.lastUpdatedOn = course.lastUpdatedOn;
		this._getMyCourseResponseDTO.materialsAndOffers =
			course.materialsAndOffers;

		this._getMyCourseResponseDTO.price.currency = course.price.currency;
		this._getMyCourseResponseDTO.price.value = course.price.value;

		this._getMyCourseResponseDTO.rating = null;

		course.sections.forEach(section => {
			const sectionResponseDTO =
				new GetMyCourseSectionResponseDTOImpl();
			sectionResponseDTO.id = section.id;

			section.lectures.forEach(lecture => {
				const lectureResponseDTO =
					new GetMyCourseSectionLectureResponseDTOImpl();
				lectureResponseDTO.description = lecture.description;
				lectureResponseDTO.duration = lecture.duration;
				lectureResponseDTO.id = lecture.id;
				lectureResponseDTO.link = lecture.link;
				lectureResponseDTO.order = lecture.order;
				lectureResponseDTO.thumbnail = lecture.thumbnail;
				lectureResponseDTO.title = lecture.title;
				lectureResponseDTO.watchDuration = lecture.watchDuration;

				sectionResponseDTO.lectures.push(lectureResponseDTO);
			});

			sectionResponseDTO.lecturesCount = section.lecturesCount;
			sectionResponseDTO.lecturesDuration = section.lecturesDuration;
			sectionResponseDTO.order = section.order;
			sectionResponseDTO.title = section.title;

			this._getMyCourseResponseDTO.sections
				.push(sectionResponseDTO);
		});

		this._getMyCourseResponseDTO.status = course.status;
		this._getMyCourseResponseDTO.subtitles = course.subtitles;
		this._getMyCourseResponseDTO.title = course.title;
		this._getMyCourseResponseDTO.totalDuration = course.totalDuration;
		this._getMyCourseResponseDTO.totalSectionsCount = 
			course.totalSectionsCount;
		this._getMyCourseResponseDTO.totalLecturesCount =
			course.totalLecturesCount;
		this._getMyCourseResponseDTO.totalStudents = course.totalStudents;

		return this._getMyCourseResponseDTO;
	}
}