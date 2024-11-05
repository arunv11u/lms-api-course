import { TokenRepository } from "../../../token";
import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { CourseObject, CourseRepository } from "../../domain";
import {
	GetAllCoursesByInstructorCreatorResponseDTOImpl,
	GetAllCoursesByInstructorRequestDTO,
	GetAllCoursesByInstructorResponseDTO,
	GetAllCoursesByInstructorResponseDTOImpl,
	GetAllCoursesByInstructorSectionLectureResponseDTOImpl,
	GetAllCoursesByInstructorSectionResponseDTOImpl
} from "../dto";
import { GetAllCoursesByInstructorUseCase } from "./get-all-courses-by-instructor.use-case.type";



export class GetAllCoursesByInstructorUseCaseImpl implements
	GetAllCoursesByInstructorUseCase, CourseObject {
	private _unitOfWork: UnitOfWork;
	private _getAllCoursesByInstructorRequestDTO:
		GetAllCoursesByInstructorRequestDTO;
	private _getAllCoursesByInstructorResponseDTO:
		GetAllCoursesByInstructorResponseDTO[] = [];

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
	}

	set getAllCoursesByInstructorRequestDTO(
		getAllCoursesByInstructorRequestDTO: GetAllCoursesByInstructorRequestDTO
	) {
		this._getAllCoursesByInstructorRequestDTO =
			getAllCoursesByInstructorRequestDTO;
	}

	async execute(): Promise<GetAllCoursesByInstructorResponseDTO[]> {
		const tokenRepository = this._unitOfWork
			.getRepository("TokenRepository") as TokenRepository;
		const courseRepository = this._unitOfWork
			.getRepository("CourseRepository") as CourseRepository;

		const { id: instructorId } = await tokenRepository
			.validateInstructorAuthorizationToken(
				this._getAllCoursesByInstructorRequestDTO.authorizationToken
			);

		const courses = await courseRepository
			.getAllCoursesByInstructor(instructorId);

		courses.forEach(course => {
			const getAllCoursesByInstructorResponseDTO =
				new GetAllCoursesByInstructorResponseDTOImpl();

			getAllCoursesByInstructorResponseDTO.category = course.category;

			course.creators.forEach(creator => {
				const creatorResponseDTO =
					new GetAllCoursesByInstructorCreatorResponseDTOImpl();
				creatorResponseDTO.designation = creator.designation;
				creatorResponseDTO.firstName = creator.firstName;
				creatorResponseDTO.lastName = creator.lastName;
				creatorResponseDTO.profilePicture = creator.profilePicture;

				getAllCoursesByInstructorResponseDTO.creators
					.push(creatorResponseDTO);
			});

			getAllCoursesByInstructorResponseDTO.description =
				course.description;
			getAllCoursesByInstructorResponseDTO.id = course.id;
			getAllCoursesByInstructorResponseDTO.image = course.image;
			getAllCoursesByInstructorResponseDTO.languages = course.languages;
			getAllCoursesByInstructorResponseDTO.lastUpdatedOn =
				course.lastUpdatedOn;
			getAllCoursesByInstructorResponseDTO.materialsAndOffers =
				course.materialsAndOffers;

			getAllCoursesByInstructorResponseDTO.price.currency =
				course.price.currency;
			getAllCoursesByInstructorResponseDTO.price.value =
				course.price.value;

			getAllCoursesByInstructorResponseDTO.rating = null;

			course.sections.forEach(section => {
				const sectionResponseDTO =
					new GetAllCoursesByInstructorSectionResponseDTOImpl();
				sectionResponseDTO.id = section.id;

				section.lectures.forEach(lecture => {
					const lectureResponseDTO =
						// eslint-disable-next-line max-len
						new GetAllCoursesByInstructorSectionLectureResponseDTOImpl();
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

				getAllCoursesByInstructorResponseDTO.sections
					.push(sectionResponseDTO);
			});

			getAllCoursesByInstructorResponseDTO.status = course.status;
			getAllCoursesByInstructorResponseDTO.subtitles = course.subtitles;
			getAllCoursesByInstructorResponseDTO.title = course.title;
			getAllCoursesByInstructorResponseDTO.totalDuration =
				course.totalDuration;
			getAllCoursesByInstructorResponseDTO.totalSectionsCount = 
				course.totalSectionsCount;
			getAllCoursesByInstructorResponseDTO.totalLecturesCount =
				course.totalLecturesCount;
			getAllCoursesByInstructorResponseDTO.totalStudents =
				course.totalStudents;

			this._getAllCoursesByInstructorResponseDTO
				.push(getAllCoursesByInstructorResponseDTO);
		});

		return this._getAllCoursesByInstructorResponseDTO;
	}
}