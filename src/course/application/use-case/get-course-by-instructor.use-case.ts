import { TokenRepository } from "../../../token";
import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { CourseObject, CourseRepository } from "../../domain";
import {
	GetCourseByInstructorCreatorResponseDTOImpl,
	GetCourseByInstructorRequestDTO,
	GetCourseByInstructorResponseDTO,
	GetCourseByInstructorResponseDTOImpl,
	GetCourseByInstructorSectionLectureResponseDTOImpl,
	GetCourseByInstructorSectionResponseDTOImpl
} from "../dto";
import { GetCourseByInstructorUseCase } from "./get-course-by-instructor.use-case.type";



export class GetCourseByInstructorUseCaseImpl implements
	GetCourseByInstructorUseCase, CourseObject {
	private _unitOfWork: UnitOfWork;
	private _getCourseByInstructorRequestDTO:
		GetCourseByInstructorRequestDTO;
	private _getCourseByInstructorResponseDTO:
		GetCourseByInstructorResponseDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
		this._getCourseByInstructorResponseDTO =
			new GetCourseByInstructorResponseDTOImpl();
	}

	set getCourseByInstructorRequestDTO(
		getCourseByInstructorRequestDTO: GetCourseByInstructorRequestDTO
	) {
		this._getCourseByInstructorRequestDTO =
			getCourseByInstructorRequestDTO;
	}

	async execute(): Promise<GetCourseByInstructorResponseDTO> {
		const tokenRepository = this._unitOfWork
			.getRepository("TokenRepository") as TokenRepository;
		const courseRepository = this._unitOfWork
			.getRepository("CourseRepository") as CourseRepository;

		const { id: instructorId } = await tokenRepository
			.validateInstructorAuthorizationToken(
				this._getCourseByInstructorRequestDTO.authorizationToken
			);

		const course = await courseRepository.getCourseByInstructor(
			this._getCourseByInstructorRequestDTO.courseId,
			instructorId
		);

		this._getCourseByInstructorResponseDTO.category = course.category;

		course.creators.forEach(creator => {
			const creatorResponseDTO =
				new GetCourseByInstructorCreatorResponseDTOImpl();
			creatorResponseDTO.designation = creator.designation;
			creatorResponseDTO.firstName = creator.firstName;
			creatorResponseDTO.lastName = creator.lastName;
			creatorResponseDTO.profilePicture = creator.profilePicture;

			this._getCourseByInstructorResponseDTO
				.creators.push(creatorResponseDTO);
		});

		this._getCourseByInstructorResponseDTO.description = course.description;
		this._getCourseByInstructorResponseDTO.id = course.id;
		this._getCourseByInstructorResponseDTO.image = course.image;
		this._getCourseByInstructorResponseDTO.languages = course.languages;
		this._getCourseByInstructorResponseDTO
			.lastUpdatedOn = course.lastUpdatedOn;
		this._getCourseByInstructorResponseDTO.materialsAndOffers =
			course.materialsAndOffers;

		this._getCourseByInstructorResponseDTO.price.currency =
			course.price.currency;
		this._getCourseByInstructorResponseDTO.price.value = course.price.value;

		this._getCourseByInstructorResponseDTO.rating = null;

		course.sections.forEach(section => {
			const sectionResponseDTO =
				new GetCourseByInstructorSectionResponseDTOImpl();
			sectionResponseDTO.id = section.id;

			section.lectures.forEach(lecture => {
				const lectureResponseDTO =
					new GetCourseByInstructorSectionLectureResponseDTOImpl();
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

			this._getCourseByInstructorResponseDTO.sections
				.push(sectionResponseDTO);
		});

		this._getCourseByInstructorResponseDTO.status = course.status;
		this._getCourseByInstructorResponseDTO.subtitles = course.subtitles;
		this._getCourseByInstructorResponseDTO.title = course.title;
		this._getCourseByInstructorResponseDTO.totalDuration =
			course.totalDuration;
		this._getCourseByInstructorResponseDTO.totalSectionsCount = 
			course.totalSectionsCount;
		this._getCourseByInstructorResponseDTO.totalLecturesCount =
			course.totalLecturesCount;
		this._getCourseByInstructorResponseDTO.totalStudents =
			course.totalStudents;

		return this._getCourseByInstructorResponseDTO;
	}
}