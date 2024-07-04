import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { CourseRepository } from "../../domain";
import {
	GetAllCoursesDocResponseDTOImpl,
	GetAllCoursesResponseDTO,
	GetAllCoursesResponseDTOImpl,
	GetAllCoursesSectionLectureResponseDTOImpl,
	GetAllCoursesSectionResponseDTOImpl
} from "../../presentation";
import { GetAllCoursesUsecase } from "./get-all-courses.usecase.type";



export class GetAllCoursesUsecaseImpl implements GetAllCoursesUsecase {
	private _unitOfWork: UnitOfWork;
	private _getAllCoursesResponseDTO: GetAllCoursesResponseDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
		this._getAllCoursesResponseDTO = new GetAllCoursesResponseDTOImpl();
	}

	async execute(): Promise<GetAllCoursesResponseDTO> {
		const courseRepository = this._unitOfWork
			.getRepository("CourseRepository") as CourseRepository;

		const coursesEntity = await courseRepository.getAll();

		coursesEntity.docs.forEach(course => {
			const getAllCoursesDocResponseDTO =
				new GetAllCoursesDocResponseDTOImpl();
			getAllCoursesDocResponseDTO.creators = course.creators;
			getAllCoursesDocResponseDTO.description = course.description;
			getAllCoursesDocResponseDTO.id = course.id;
			getAllCoursesDocResponseDTO.image = course.image;
			getAllCoursesDocResponseDTO.languages = course.languages;
			getAllCoursesDocResponseDTO.lastUpdatedOn = course.lastUpdatedOn;
			getAllCoursesDocResponseDTO.learnings = course.learnings;
			getAllCoursesDocResponseDTO.materialsAndOffers =
				course.materialsAndOffers;

			getAllCoursesDocResponseDTO.price.currency = course.price.currency;
			getAllCoursesDocResponseDTO.price.value = course.price.value;

			getAllCoursesDocResponseDTO.rating.totalCount =
				course.rating.totalCount;
			getAllCoursesDocResponseDTO.rating.value = course.rating.value;

			course.sections.forEach(section => {
				const getAllCoursesSectionResponseDTO =
					new GetAllCoursesSectionResponseDTOImpl();
				getAllCoursesSectionResponseDTO.id = section.id;

				section.lectures.forEach(lecture => {
					const getAllCoursesSectionLectureResponseDTO =
						new GetAllCoursesSectionLectureResponseDTOImpl();
					getAllCoursesSectionLectureResponseDTO.description =
						lecture.description;
					getAllCoursesSectionLectureResponseDTO.duration =
						lecture.duration;
					getAllCoursesSectionLectureResponseDTO.id = lecture.id;
					getAllCoursesSectionLectureResponseDTO.link = lecture.link;
					getAllCoursesSectionLectureResponseDTO.thumbnail =
						lecture.thumbnail;
					getAllCoursesSectionLectureResponseDTO.title =
						lecture.title;

					getAllCoursesSectionResponseDTO.lectures
						.push(getAllCoursesSectionLectureResponseDTO);
				});

				getAllCoursesSectionResponseDTO.lecturesCount =
					section.lecturesCount;
				getAllCoursesSectionResponseDTO.lecturesDuration =
					section.lecturesDuration;
				getAllCoursesSectionResponseDTO.title = section.title;

				getAllCoursesDocResponseDTO.sections
					.push(getAllCoursesSectionResponseDTO);
			});

			getAllCoursesDocResponseDTO.subtitles = course.subtitles;
			getAllCoursesDocResponseDTO.title = course.title;
			getAllCoursesDocResponseDTO.totalDuration = course.totalDuration;
			getAllCoursesDocResponseDTO.totalLecturesCount =
				course.totalLecturesCount;
			getAllCoursesDocResponseDTO.totalSectionsCount =
				course.totalSectionsCount;
			getAllCoursesDocResponseDTO.totalStudents = course.totalStudents;

			this._getAllCoursesResponseDTO.docs
				.push(getAllCoursesDocResponseDTO);
		});

		this._getAllCoursesResponseDTO.count = coursesEntity.count;

		return this._getAllCoursesResponseDTO;
	}
}