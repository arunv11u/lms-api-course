import { TokenRepository } from "../../../token";
import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { CourseObject, CourseRepository } from "../../domain";
import {
	GetMyLearningsCreatorResponseDTOImpl,
	GetMyLearningsRequestDTO,
	GetMyLearningsResponseDTO,
	GetMyLearningsResponseDTOImpl,
	GetMyLearningsSectionLectureResponseDTOImpl,
	GetMyLearningsSectionResponseDTOImpl
} from "../dto";
import { GetMyLearningsUseCase } from "./get-my-learnings.use-case.type";



export class GetMyLearningsUseCaseImpl implements
	GetMyLearningsUseCase, CourseObject {
	private _unitOfWork: UnitOfWork;
	private _getMyLearningsRequestDTO:
		GetMyLearningsRequestDTO;
	private _getMyLearningsResponseDTO:
		GetMyLearningsResponseDTO[] = [];

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
	}

	set getMyLearningsRequestDTO(
		getMyLearningsRequestDTO: GetMyLearningsRequestDTO
	) {
		this._getMyLearningsRequestDTO = getMyLearningsRequestDTO;
	}

	async execute(): Promise<GetMyLearningsResponseDTO[]> {
		const tokenRepository = this._unitOfWork
			.getRepository("TokenRepository") as TokenRepository;
		const courseRepository = this._unitOfWork
			.getRepository("CourseRepository") as CourseRepository;

		const { id: studentId } = await tokenRepository
			.validateStudentAuthorizationToken(
				this._getMyLearningsRequestDTO.authorizationToken
			);

		const courses = await courseRepository.getMyLearnings(
			studentId
		);

		courses.forEach(course => {
			const getMyLearningsResponseDTO =
				new GetMyLearningsResponseDTOImpl();

			getMyLearningsResponseDTO.category = course.category;

			course.creators.forEach(creator => {
				const creatorResponseDTO =
					new GetMyLearningsCreatorResponseDTOImpl();
				creatorResponseDTO.designation = creator.designation;
				creatorResponseDTO.firstName = creator.firstName;
				creatorResponseDTO.lastName = creator.lastName;
				creatorResponseDTO.profilePicture = creator.profilePicture;

				getMyLearningsResponseDTO.creators.push(creatorResponseDTO);
			});

			getMyLearningsResponseDTO.description = course.description;
			getMyLearningsResponseDTO.id = course.id;
			getMyLearningsResponseDTO.image = course.image;
			getMyLearningsResponseDTO.languages = course.languages;
			getMyLearningsResponseDTO.lastUpdatedOn = course.lastUpdatedOn;
			getMyLearningsResponseDTO.materialsAndOffers =
				course.materialsAndOffers;

			getMyLearningsResponseDTO.price.currency = course.price.currency;
			getMyLearningsResponseDTO.price.value = course.price.value;

			getMyLearningsResponseDTO.rating = null;

			course.sections.forEach(section => {
				const sectionResponseDTO =
					new GetMyLearningsSectionResponseDTOImpl();
				sectionResponseDTO.id = section.id;

				section.lectures.forEach(lecture => {
					const lectureResponseDTO =
						new GetMyLearningsSectionLectureResponseDTOImpl();
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

				getMyLearningsResponseDTO.sections
					.push(sectionResponseDTO);
			});

			getMyLearningsResponseDTO.status = course.status;
			getMyLearningsResponseDTO.subtitles = course.subtitles;
			getMyLearningsResponseDTO.title = course.title;
			getMyLearningsResponseDTO.totalDuration = course.totalDuration;
			getMyLearningsResponseDTO.totalLecturesCount =
				course.totalLecturesCount;
			getMyLearningsResponseDTO.totalStudents = course.totalStudents;

			this._getMyLearningsResponseDTO
				.push(getMyLearningsResponseDTO);
		});

		return this._getMyLearningsResponseDTO;
	}
}