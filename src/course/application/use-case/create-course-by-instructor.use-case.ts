import { getCourseFactory, getTranscoderFactory } from "../../../global-config";
import { InstructorRepository } from "../../../instructor";
import { TokenRepository } from "../../../token";
import { TranscoderRepository } from "../../../transcoder";
import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import {
	CourseCreatorValueObject,
	CourseEntity,
	CourseObject,
	CourseRepository,
	CourseSectionLectureSubtitleValueObject,
	CourseSectionLectureValueObject,
	CourseSectionValueObject,
	CourseStatuses
} from "../../domain";
import { CourseFactory } from "../../factory";
import {
	CreateCourseByInstructorCreatorResponseDTOImpl,
	CreateCourseByInstructorRequestDTO,
	CreateCourseByInstructorResponseDTO,
	CreateCourseByInstructorResponseDTOImpl,
	CreateCourseByInstructorSectionLectureResponseDTOImpl,
	CreateCourseByInstructorSectionLectureSubtitleResponseDTOImpl,
	CreateCourseByInstructorSectionRequestDTO,
	CreateCourseByInstructorSectionResponseDTOImpl
} from "../dto";
import { CreateCourseByInstructorUseCase } from "./create-course-by-instructor.use-case.type";



export class CreateCourseByInstructorUseCaseImpl implements
	CreateCourseByInstructorUseCase, CourseObject {
	private _unitOfWork: UnitOfWork;
	private _createCourseByInstructorRequestDTO:
		CreateCourseByInstructorRequestDTO;
	private _createCourseByInstructorResponseDTO:
		CreateCourseByInstructorResponseDTO;
	private _courseFactory: CourseFactory;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
		this._createCourseByInstructorResponseDTO =
			new CreateCourseByInstructorResponseDTOImpl();
		this._courseFactory = getCourseFactory();
	}

	set createCourseByInstructorRequestDTO(
		createCourseByInstructorRequestDTO: CreateCourseByInstructorRequestDTO
	) {
		this._createCourseByInstructorRequestDTO =
			createCourseByInstructorRequestDTO;
	}

	async execute(): Promise<CreateCourseByInstructorResponseDTO> {
		try {
			await this._unitOfWork.start();

			const tokenRepository = this._unitOfWork
				.getRepository("TokenRepository") as TokenRepository;
			const courseRepository = this._unitOfWork
				.getRepository("CourseRepository") as CourseRepository;
			const instructorRepository = this._unitOfWork
				.getRepository("InstructorRepository") as InstructorRepository;
			const transcoderRepository = getTranscoderFactory()
				.make("TranscoderRepository") as TranscoderRepository;

			const { id } = await tokenRepository
				.validateInstructorAuthorizationToken(
					this._createCourseByInstructorRequestDTO.authorizationToken
				);

			const instructorValueObject = await instructorRepository
				.getWithId(id);

			const instructorId = instructorValueObject.id;

			const courseEntity = this._courseFactory.make("CourseEntity") as CourseEntity;
			courseEntity.category =
				this._createCourseByInstructorRequestDTO.category;


			const courseCreatorValueObject = new CourseCreatorValueObject();

			courseCreatorValueObject.designation = 
				instructorValueObject.designation;
			courseCreatorValueObject.firstName =
				instructorValueObject.firstName;
			courseCreatorValueObject.id = instructorValueObject.id;
			courseCreatorValueObject.lastName = instructorValueObject.lastName;
			courseCreatorValueObject.profilePicture = 
				instructorValueObject.profilePicture;
			courseEntity.addCreator(courseCreatorValueObject);

			this._createCourseByInstructorRequestDTO.languages
				.forEach(language => {
					courseEntity.addLanguage(language);
				});

			this._createCourseByInstructorRequestDTO.learnings
				.forEach(learning => {
					courseEntity.addLearning(learning);
				});

			this._createCourseByInstructorRequestDTO.materialsAndOffers
				.forEach(materialAndOffer => {
					courseEntity.addMaterialAndOffer(materialAndOffer);
				});

			this._createCourseByInstructorRequestDTO.sections
				.forEach(section => {
					const courseSectionValueObject =
						new CourseSectionValueObject;
					courseSectionValueObject.id =
						courseRepository.getSectionId();

					section.lectures.forEach(lecture => {
						const courseSectionLectureValueObject =
							new CourseSectionLectureValueObject();
						courseSectionLectureValueObject.description =
							lecture.description;
						courseSectionLectureValueObject.duration = 0;
						courseSectionLectureValueObject.id =
							courseRepository.getSectionLectureId();
						courseSectionLectureValueObject.link = lecture.link;
						courseSectionLectureValueObject.order = lecture.order;

						lecture.subtitles.forEach(subtitle => {
							const courseSectionLectureSubtitleValueObject =
								new CourseSectionLectureSubtitleValueObject();
							courseSectionLectureSubtitleValueObject.language =
								subtitle.language;
							courseSectionLectureSubtitleValueObject.url =
								subtitle.url;

							courseSectionLectureValueObject.subtitles
								.push(courseSectionLectureSubtitleValueObject);
						});

						courseSectionLectureValueObject.thumbnail = null;
						courseSectionLectureValueObject.title = lecture.title;

						courseSectionValueObject.lectures
							.push(courseSectionLectureValueObject);
					});

					courseSectionValueObject.lecturesCount = 
						section.lectures.length;
					courseSectionValueObject.lecturesDuration = 0;
					courseSectionValueObject.order = section.order;
					courseSectionValueObject.title = section.title;

					courseEntity.addSection(courseSectionValueObject);
				});

			this._createCourseByInstructorRequestDTO.subtitles
				.forEach(subtitle => {
					courseEntity.addSubtitle(subtitle);
				});

			courseEntity.category =
				this._createCourseByInstructorRequestDTO.category;
				
			courseEntity.description =
				this._createCourseByInstructorRequestDTO.description;
			courseEntity.id = courseRepository.getId();
			courseEntity.image = this._createCourseByInstructorRequestDTO.image;
			courseEntity.lastUpdatedOn = new Date();

			courseEntity.setPrice(
				this._createCourseByInstructorRequestDTO.price.currency,
				this._createCourseByInstructorRequestDTO.price.value
			);

			courseEntity.status = CourseStatuses.transcodingInProgress;
			courseEntity.title = this._createCourseByInstructorRequestDTO.title;
			courseEntity.totalDuration = 0;
			courseEntity.totalLecturesCount =
				this._createCourseByInstructorRequestDTO
					.sections
					.reduce(
						// eslint-disable-next-line max-len
						(accumulator: number, section: CreateCourseByInstructorSectionRequestDTO): number =>
							accumulator + section.lectures.length, 0
					);
			courseEntity.totalSectionsCount =
				this._createCourseByInstructorRequestDTO.sections.length;
			courseEntity.totalStudents = 0;

			await courseRepository
				.createCourseByInstructor(courseEntity, instructorId);

			await transcoderRepository.transcodeVideoLectures(courseEntity);

			this._createCourseByInstructorResponseDTO.category =
				courseEntity.category;

			courseEntity.creators.forEach(creator => {
				const createCourseByInstructorCreatorResponseDTO =
					new CreateCourseByInstructorCreatorResponseDTOImpl();
				createCourseByInstructorCreatorResponseDTO.designation =
					creator.designation;
				createCourseByInstructorCreatorResponseDTO.firstName =
					creator.firstName;
				createCourseByInstructorCreatorResponseDTO.lastName =
					creator.lastName;
				createCourseByInstructorCreatorResponseDTO.profilePicture =
					creator.profilePicture;

				this._createCourseByInstructorResponseDTO.creators
					.push(createCourseByInstructorCreatorResponseDTO);
			});

			this._createCourseByInstructorResponseDTO.description =
				courseEntity.description;
			this._createCourseByInstructorResponseDTO.id = courseEntity.id;
			this._createCourseByInstructorResponseDTO
				.image = courseEntity.image;
			courseEntity.languages.forEach(language => {
				this._createCourseByInstructorResponseDTO
					.languages.push(language);
			});
			this._createCourseByInstructorResponseDTO.lastUpdatedOn =
				courseEntity.lastUpdatedOn;

			courseEntity.materialsAndOffers.forEach(materialAndOffer => {
				this._createCourseByInstructorResponseDTO.materialsAndOffers
					.push(materialAndOffer);
			});

			this._createCourseByInstructorResponseDTO.price.currency =
				courseEntity.price.currency;
			this._createCourseByInstructorResponseDTO.price.value =
				courseEntity.price.value;

			this._createCourseByInstructorResponseDTO.rating = null;

			courseEntity.sections.forEach(section => {
				const createCourseByInstructorSectionResponseDTO =
					new CreateCourseByInstructorSectionResponseDTOImpl();
				createCourseByInstructorSectionResponseDTO.id = section.id;

				section.lectures.forEach(lecture => {
					const createCourseByInstructorSectionLectureResponseDTO =
						// eslint-disable-next-line max-len
						new CreateCourseByInstructorSectionLectureResponseDTOImpl();
					createCourseByInstructorSectionLectureResponseDTO
						.description = lecture.description;
					createCourseByInstructorSectionLectureResponseDTO
						.duration = lecture.duration;
					createCourseByInstructorSectionLectureResponseDTO
						.id = lecture.id;
					createCourseByInstructorSectionLectureResponseDTO
						.link = lecture.link;
					createCourseByInstructorSectionLectureResponseDTO
						.order = lecture.order;

					lecture.subtitles.forEach(subtitle => {
						// eslint-disable-next-line max-len
						const createCourseByInstructorSectionLectureSubtitleResponseDTO =
							// eslint-disable-next-line max-len
							new CreateCourseByInstructorSectionLectureSubtitleResponseDTOImpl();

						// eslint-disable-next-line max-len
						createCourseByInstructorSectionLectureSubtitleResponseDTO
							.language = subtitle.language;
						// eslint-disable-next-line max-len
						createCourseByInstructorSectionLectureSubtitleResponseDTO
							.url = subtitle.url;

						createCourseByInstructorSectionLectureResponseDTO
							.subtitles
							// eslint-disable-next-line max-len
							.push(createCourseByInstructorSectionLectureSubtitleResponseDTO);
					});

					createCourseByInstructorSectionLectureResponseDTO
						.thumbnail = lecture.thumbnail;
					createCourseByInstructorSectionLectureResponseDTO
						.title = lecture.title;

					createCourseByInstructorSectionResponseDTO.lectures
						.push(
							createCourseByInstructorSectionLectureResponseDTO
						);
				});

				createCourseByInstructorSectionResponseDTO.lecturesCount =
					section.lecturesCount;
				createCourseByInstructorSectionResponseDTO.lecturesDuration =
					section.lecturesDuration;
				createCourseByInstructorSectionResponseDTO.order =
					section.order;
				createCourseByInstructorSectionResponseDTO.title =
					section.title;

				this._createCourseByInstructorResponseDTO.sections
					.push(createCourseByInstructorSectionResponseDTO);
			});

			this._createCourseByInstructorResponseDTO.status = 
				courseEntity.status;

			courseEntity.subtitles.forEach(subtitle => {
				this._createCourseByInstructorResponseDTO
					.subtitles.push(subtitle);
			});

			this._createCourseByInstructorResponseDTO
				.title = courseEntity.title;
			this._createCourseByInstructorResponseDTO.totalDuration =
				courseEntity.totalDuration;
			this._createCourseByInstructorResponseDTO.totalLecturesCount =
				courseEntity.totalLecturesCount;
			this._createCourseByInstructorResponseDTO.totalSectionsCount =
				courseEntity.totalSectionsCount;
			this._createCourseByInstructorResponseDTO.totalStudents =
				courseEntity.totalStudents;

			await this._unitOfWork.complete();

			return this._createCourseByInstructorResponseDTO;
		} catch (error) {
			await this._unitOfWork.dispose();

			throw error;
		}
	}
}