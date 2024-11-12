import { TokenRepository } from "../../../token";
import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { CourseObject, CoursePaginationValueObject, CourseRepository } from "../../domain";
import { ExploreAllCoursesCreatorResponseDTOImpl, ExploreAllCoursesRequestDTO, ExploreAllCoursesResponseDTO, ExploreAllCoursesResponseDTOImpl, ExploreAllCoursesSectionLectureResponseDTOImpl, ExploreAllCoursesSectionResponseDTOImpl } from "../dto";
import { ExploreAllCoursesUseCase } from "./explore-all-courses.use-case.type";



export class ExploreAllCoursesUseCaseImpl implements
	ExploreAllCoursesUseCase, CourseObject {
	private _unitOfWork: UnitOfWork;
	private _exploreAllCoursesRequestDTO:
		ExploreAllCoursesRequestDTO;
	private _exploreAllCoursesResponseDTO:
		ExploreAllCoursesResponseDTO[] = [];

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
	}

	set exploreAllCoursesRequestDTO(
		exploreAllCoursesRequestDTO: ExploreAllCoursesRequestDTO
	) {
		this._exploreAllCoursesRequestDTO = exploreAllCoursesRequestDTO;
	}

	async execute(): Promise<ExploreAllCoursesResponseDTO[]> {
		const tokenRepository = this._unitOfWork
			.getRepository("TokenRepository") as TokenRepository;
		const courseRepository = this._unitOfWork
			.getRepository("CourseRepository") as CourseRepository;

		let studentId: string | null = null;

		if(this._exploreAllCoursesRequestDTO.authorizationToken) {
			const { id } = await tokenRepository
				.validateStudentAuthorizationToken(
					this._exploreAllCoursesRequestDTO.authorizationToken
				);

			studentId = id;
		}

		const coursePaginationValueObject = new CoursePaginationValueObject();
		coursePaginationValueObject.pageIndex =
			this._exploreAllCoursesRequestDTO.pageIndex;
		coursePaginationValueObject.pageSize =
			this._exploreAllCoursesRequestDTO.pageSize;
		coursePaginationValueObject.sortField =
			this._exploreAllCoursesRequestDTO.sortField;
		coursePaginationValueObject.sortType =
			this._exploreAllCoursesRequestDTO.sortType;

		const coursesDocsCountList = await courseRepository.exploreAllCourses(
			this._exploreAllCoursesRequestDTO.searchString,
			this._exploreAllCoursesRequestDTO.categories,
			coursePaginationValueObject,
			studentId
		);

		coursesDocsCountList.docs.forEach(course => {
			const exploreAllCoursesResponseDTO =
				new ExploreAllCoursesResponseDTOImpl();
			exploreAllCoursesResponseDTO.category = course.category;

			course.creators.forEach(creator => {
				const creatorResponseDTO =
					new ExploreAllCoursesCreatorResponseDTOImpl();
				creatorResponseDTO.designation = creator.designation;
				creatorResponseDTO.firstName = creator.firstName;
				creatorResponseDTO.lastName = creator.lastName;
				creatorResponseDTO.profilePicture = creator.profilePicture;

				exploreAllCoursesResponseDTO.creators.push(creatorResponseDTO);
			});

			exploreAllCoursesResponseDTO.description = course.description;
			exploreAllCoursesResponseDTO.id = course.id;
			exploreAllCoursesResponseDTO.image = course.image;
			exploreAllCoursesResponseDTO.languages = course.languages;
			exploreAllCoursesResponseDTO.lastUpdatedOn = course.lastUpdatedOn;
			exploreAllCoursesResponseDTO.materialsAndOffers =
				course.materialsAndOffers;

			exploreAllCoursesResponseDTO.price.currency = course.price.currency;
			exploreAllCoursesResponseDTO.price.value = course.price.value;

			exploreAllCoursesResponseDTO.rating = null;

			course.sections.forEach(section => {
				const sectionResponseDTO =
					new ExploreAllCoursesSectionResponseDTOImpl();
				sectionResponseDTO.id = section.id;

				section.lectures.forEach(lecture => {
					const lectureResponseDTO =
						new ExploreAllCoursesSectionLectureResponseDTOImpl();
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

				exploreAllCoursesResponseDTO.sections
					.push(sectionResponseDTO);
			});

			exploreAllCoursesResponseDTO.status = course.status;
			exploreAllCoursesResponseDTO.subtitles = course.subtitles;
			exploreAllCoursesResponseDTO.title = course.title;
			exploreAllCoursesResponseDTO.totalDuration = course.totalDuration;
			exploreAllCoursesResponseDTO.totalSectionsCount = 
			course.totalSectionsCount;
			exploreAllCoursesResponseDTO.totalLecturesCount =
				course.totalLecturesCount;
			exploreAllCoursesResponseDTO.totalStudents = course.totalStudents;
			exploreAllCoursesResponseDTO.isStudentEnrolledForCourse = 
				course.isStudentEnrolledForCourse;

			this._exploreAllCoursesResponseDTO
				.push(exploreAllCoursesResponseDTO);
		});

		return this._exploreAllCoursesResponseDTO;
	}
}