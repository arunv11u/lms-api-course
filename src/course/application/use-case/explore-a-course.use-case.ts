import { TokenRepository } from "../../../token";
import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { CourseObject, CourseRepository } from "../../domain";
import {
	ExploreACourseCreatorResponseDTOImpl,
	ExploreACourseRequestDTO,
	ExploreACourseResponseDTO,
	ExploreACourseResponseDTOImpl,
	ExploreACourseSectionLectureResponseDTOImpl,
	ExploreACourseSectionResponseDTOImpl
} from "../dto";
import { ExploreACourseUseCase } from "./explore-a-course.use-case.type";



export class ExploreACourseUseCaseImpl implements
	ExploreACourseUseCase, CourseObject {
	private _unitOfWork: UnitOfWork;
	private _exploreACourseRequestDTO:
		ExploreACourseRequestDTO;
	private _exploreACourseResponseDTO:
		ExploreACourseResponseDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
		this._exploreACourseResponseDTO = new ExploreACourseResponseDTOImpl();
	}

	set exploreACourseRequestDTO(
		exploreACourseRequestDTO: ExploreACourseRequestDTO
	) {
		this._exploreACourseRequestDTO = exploreACourseRequestDTO;
	}

	async execute(): Promise<ExploreACourseResponseDTO> {
		const tokenRepository = this._unitOfWork
			.getRepository("TokenRepository") as TokenRepository;
		const courseRepository = this._unitOfWork
			.getRepository("CourseRepository") as CourseRepository;

		let studentId: string | null = null;

		if (this._exploreACourseRequestDTO.authorizationToken) {
			const { id } = await tokenRepository
				.validateStudentAuthorizationToken(
					this._exploreACourseRequestDTO.authorizationToken
				);

			studentId = id;
		}

		const course = await courseRepository
			.exploreACourse(
				this._exploreACourseRequestDTO.courseId,
				studentId
			);

		this._exploreACourseResponseDTO.category = course.category;

		course.creators.forEach(creator => {
			const creatorResponseDTO =
				new ExploreACourseCreatorResponseDTOImpl();
			creatorResponseDTO.designation = creator.designation;
			creatorResponseDTO.firstName = creator.firstName;
			creatorResponseDTO.lastName = creator.lastName;
			creatorResponseDTO.profilePicture = creator.profilePicture;

			this._exploreACourseResponseDTO.creators.push(creatorResponseDTO);
		});

		this._exploreACourseResponseDTO.description = course.description;
		this._exploreACourseResponseDTO.id = course.id;
		this._exploreACourseResponseDTO.image = course.image;
		this._exploreACourseResponseDTO.languages = course.languages;
		this._exploreACourseResponseDTO.lastUpdatedOn = course.lastUpdatedOn;
		this._exploreACourseResponseDTO.materialsAndOffers =
			course.materialsAndOffers;

		this._exploreACourseResponseDTO.price.currency = course.price.currency;
		this._exploreACourseResponseDTO.price.value = course.price.value;

		this._exploreACourseResponseDTO.rating = null;

		course.sections.forEach(section => {
			const sectionResponseDTO =
				new ExploreACourseSectionResponseDTOImpl();
			sectionResponseDTO.id = section.id;

			section.lectures.forEach(lecture => {
				const lectureResponseDTO =
					new ExploreACourseSectionLectureResponseDTOImpl();
				lectureResponseDTO.description = lecture.description;
				lectureResponseDTO.duration = lecture.duration;
				lectureResponseDTO.id = lecture.id;
				lectureResponseDTO.order = lecture.order;
				lectureResponseDTO.thumbnail = lecture.thumbnail;
				lectureResponseDTO.title = lecture.title;

				sectionResponseDTO.lectures.push(lectureResponseDTO);
			});

			sectionResponseDTO.lecturesCount = section.lecturesCount;
			sectionResponseDTO.lecturesDuration = section.lecturesDuration;
			sectionResponseDTO.order = section.order;
			sectionResponseDTO.title = section.title;

			this._exploreACourseResponseDTO.sections
				.push(sectionResponseDTO);
		});

		this._exploreACourseResponseDTO.status = course.status;
		this._exploreACourseResponseDTO.subtitles = course.subtitles;
		this._exploreACourseResponseDTO.title = course.title;
		this._exploreACourseResponseDTO.totalDuration = course.totalDuration;
		this._exploreACourseResponseDTO.totalSectionsCount =
			course.totalSectionsCount;
		this._exploreACourseResponseDTO.totalLecturesCount =
			course.totalLecturesCount;
		this._exploreACourseResponseDTO.totalStudents = course.totalStudents;
		this._exploreACourseResponseDTO.isStudentEnrolledForCourse = 
			course.isStudentEnrolledForCourse;

		return this._exploreACourseResponseDTO;
	}
}