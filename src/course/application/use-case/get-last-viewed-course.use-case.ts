import { TokenRepository } from "../../../token";
import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { CourseObject, CourseRepository } from "../../domain";
import {
	GetLastViewedCourseCreatorResponseDTOImpl,
	GetLastViewedCourseLastViewedLectureResponseDTOImpl,
	GetLastViewedCourseRequestDTO,
	GetLastViewedCourseResponseDTO,
	GetLastViewedCourseResponseDTOImpl,
	GetLastViewedCourseSectionLectureResponseDTOImpl,
	GetLastViewedCourseSectionResponseDTOImpl
} from "../dto";
import { GetLastViewedCourseUseCase } from "./get-last-viewed-course.use-case.type";



export class GetLastViewedCourseUseCaseImpl implements
	GetLastViewedCourseUseCase, CourseObject {
	private _unitOfWork: UnitOfWork;
	private _getLastViewedCourseRequestDTO:
		GetLastViewedCourseRequestDTO;
	private _getLastViewedCourseResponseDTO:
		GetLastViewedCourseResponseDTO | null = null;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
	}

	set getLastViewedCourseRequestDTO(
		getLastViewedCourseRequestDTO: GetLastViewedCourseRequestDTO
	) {
		this._getLastViewedCourseRequestDTO = getLastViewedCourseRequestDTO;
	}

	async execute(): Promise<GetLastViewedCourseResponseDTO | null> {
		const tokenRepository = this._unitOfWork
			.getRepository("TokenRepository") as TokenRepository;
		const courseRepository = this._unitOfWork
			.getRepository("CourseRepository") as CourseRepository;

		const { id: studentId } = await tokenRepository
			.validateStudentAuthorizationToken(
				this._getLastViewedCourseRequestDTO.authorizationToken
			);

		const course = await courseRepository
			.getLastViewedCourseByStudent(studentId);

		if (course) {
			const getLastViewedCourseResponseDTO =
				new GetLastViewedCourseResponseDTOImpl();

			getLastViewedCourseResponseDTO.category = course.category;

			course.creators.forEach(creator => {
				const creatorResponseDTO =
					new GetLastViewedCourseCreatorResponseDTOImpl();
				creatorResponseDTO.designation = creator.designation;
				creatorResponseDTO.firstName = creator.firstName;
				creatorResponseDTO.lastName = creator.lastName;
				creatorResponseDTO.profilePicture = creator.profilePicture;

				getLastViewedCourseResponseDTO
					.creators.push(creatorResponseDTO);
			});

			getLastViewedCourseResponseDTO.description = course.description;
			getLastViewedCourseResponseDTO.id = course.id;
			getLastViewedCourseResponseDTO.image = course.image;
			getLastViewedCourseResponseDTO.languages = course.languages;
			getLastViewedCourseResponseDTO.lastUpdatedOn = course.lastUpdatedOn;
			getLastViewedCourseResponseDTO.materialsAndOffers =
				course.materialsAndOffers;

			getLastViewedCourseResponseDTO.price.currency =
				course.price.currency;
			getLastViewedCourseResponseDTO.price.value = course.price.value;

			getLastViewedCourseResponseDTO.rating = null;

			course.sections.forEach(section => {
				const sectionResponseDTO =
					new GetLastViewedCourseSectionResponseDTOImpl();
				sectionResponseDTO.id = section.id;

				section.lectures.forEach(lecture => {
					const lectureResponseDTO =
						new GetLastViewedCourseSectionLectureResponseDTOImpl();
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

				getLastViewedCourseResponseDTO.sections
					.push(sectionResponseDTO);
			});

			getLastViewedCourseResponseDTO.status = course.status;
			getLastViewedCourseResponseDTO.subtitles = course.subtitles;
			getLastViewedCourseResponseDTO.title = course.title;
			getLastViewedCourseResponseDTO.totalDuration = course.totalDuration;
			getLastViewedCourseResponseDTO.totalSectionsCount =
				course.totalSectionsCount;
			getLastViewedCourseResponseDTO.totalLecturesCount =
				course.totalLecturesCount;
			getLastViewedCourseResponseDTO.totalStudents = course.totalStudents;

			if (course.lastViewedLecture) {
				const lastViewedLectureResponseDTO =
					new GetLastViewedCourseLastViewedLectureResponseDTOImpl();

				lastViewedLectureResponseDTO.description =
					course.lastViewedLecture.description;
				lastViewedLectureResponseDTO.duration =
					course.lastViewedLecture.duration;
				lastViewedLectureResponseDTO.id = course.lastViewedLecture.id;
				lastViewedLectureResponseDTO.link =
					course.lastViewedLecture.link;
				lastViewedLectureResponseDTO.order =
					course.lastViewedLecture.order;
				lastViewedLectureResponseDTO.thumbnail =
					course.lastViewedLecture.thumbnail;
				lastViewedLectureResponseDTO.title =
					course.lastViewedLecture.title;
				lastViewedLectureResponseDTO.watchDuration =
					course.lastViewedLecture.watchDuration;

				getLastViewedCourseResponseDTO
					.lastViewedLecture = lastViewedLectureResponseDTO;
			}

			this._getLastViewedCourseResponseDTO =
				getLastViewedCourseResponseDTO;
		}

		return this._getLastViewedCourseResponseDTO;
	}
}