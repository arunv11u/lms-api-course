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
	CourseSectionValueObject
} from "../../domain";
import { CourseFactory } from "../../factory";
import {
	UpdateCourseByInstructorCreatorResponseDTOImpl,
	UpdateCourseByInstructorRequestDTO,
	UpdateCourseByInstructorResponseDTO,
	UpdateCourseByInstructorResponseDTOImpl,
	UpdateCourseByInstructorSectionLectureResponseDTOImpl,
	UpdateCourseByInstructorSectionLectureSubtitleResponseDTOImpl,
	UpdateCourseByInstructorSectionRequestDTO,
	UpdateCourseByInstructorSectionResponseDTOImpl
} from "../dto";
import { UpdateCourseByInstructorUseCase } from "./update-course-by-instructor.use-case.type";




export class UpdateCourseByInstructorUseCaseImpl implements
	UpdateCourseByInstructorUseCase, CourseObject {
	private _unitOfWork: UnitOfWork;
	private _updateCourseByInstructorRequestDTO:
		UpdateCourseByInstructorRequestDTO;
	private _updateCourseByInstructorResponseDTO:
		UpdateCourseByInstructorResponseDTO;
	private _courseFactory: CourseFactory;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
		this._updateCourseByInstructorResponseDTO =
			new UpdateCourseByInstructorResponseDTOImpl();
		this._courseFactory = getCourseFactory();
	}

	set updateCourseByInstructorRequestDTO(
		updateCourseByInstructorRequestDTO: UpdateCourseByInstructorRequestDTO
	) {
		this._updateCourseByInstructorRequestDTO =
			updateCourseByInstructorRequestDTO;
	}

	async execute(): Promise<UpdateCourseByInstructorResponseDTO> {
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
					this._updateCourseByInstructorRequestDTO.authorizationToken
				);

			const instructorValueObject = await instructorRepository
				.getWithId(id);

			const instructorId = instructorValueObject.id;

			const courseEntity = this._courseFactory.make("CourseEntity") as CourseEntity;

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

			this._updateCourseByInstructorRequestDTO.languages
				.forEach(language => {
					courseEntity.addLanguage(language);
				});

			this._updateCourseByInstructorRequestDTO.learnings
				.forEach(learning => {
					courseEntity.addLearning(learning);
				});

			this._updateCourseByInstructorRequestDTO.materialsAndOffers
				.forEach(materialAndOffer => {
					courseEntity.addMaterialAndOffer(materialAndOffer);
				});

			this._updateCourseByInstructorRequestDTO.sections
				.forEach(section => {
					const courseSectionValueObject =
						new CourseSectionValueObject();
					courseSectionValueObject.id =
						section.id ?
							section.id : courseRepository.getSectionId();

					section.lectures.forEach(lecture => {
						const courseSectionLectureValueObject =
							new CourseSectionLectureValueObject();
						courseSectionLectureValueObject.description =
							lecture.description;
						courseSectionLectureValueObject.duration = 0;
						courseSectionLectureValueObject.id =
							// eslint-disable-next-line max-len
							lecture.id ? lecture.id : courseRepository.getSectionLectureId();
						courseSectionLectureValueObject.link = lecture.link;
						courseSectionLectureValueObject.order = lecture.order;

						if(lecture.subtitles) {
							lecture.subtitles.forEach(subtitle => {
								const courseSectionLectureSubtitleValueObject =
									// eslint-disable-next-line max-len
									new CourseSectionLectureSubtitleValueObject();
								// eslint-disable-next-line max-len
								courseSectionLectureSubtitleValueObject.language =
									subtitle.language;
								courseSectionLectureSubtitleValueObject.url =
									subtitle.url;
	
								courseSectionLectureValueObject.subtitles
									.push(
										courseSectionLectureSubtitleValueObject
									);
							});
						}

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

			this._updateCourseByInstructorRequestDTO.subtitles
				.forEach(subtitle => {
					courseEntity.addSubtitle(subtitle);
				});

			courseEntity.category =
				this._updateCourseByInstructorRequestDTO.category;

			courseEntity.description =
				this._updateCourseByInstructorRequestDTO.description;
			courseEntity.id = this._updateCourseByInstructorRequestDTO.id;
			courseEntity.image = this._updateCourseByInstructorRequestDTO.image;
			courseEntity.lastUpdatedOn = new Date();

			courseEntity.setPrice(
				this._updateCourseByInstructorRequestDTO.price.currency,
				this._updateCourseByInstructorRequestDTO.price.value
			);

			courseEntity.title = this._updateCourseByInstructorRequestDTO.title;
			courseEntity.totalDuration = 0;
			courseEntity.totalLecturesCount =
				this._updateCourseByInstructorRequestDTO
					.sections
					.reduce(
						// eslint-disable-next-line max-len
						(accumulator: number, section: UpdateCourseByInstructorSectionRequestDTO): number =>
							accumulator + section.lectures.length, 0
					);
			courseEntity.totalSectionsCount =
				this._updateCourseByInstructorRequestDTO.sections.length;
			courseEntity.totalStudents = 0;

			const updatedCourseEntity = await courseRepository
				.updateCourseByInstructor(courseEntity, instructorId);

			await transcoderRepository
				.transcodeVideoLecturesIfUpdated(courseEntity);

			this._updateCourseByInstructorResponseDTO.category =
				updatedCourseEntity.category;

			updatedCourseEntity.creators.forEach(creator => {
				const updateCourseByInstructorCreatorResponseDTO =
					new UpdateCourseByInstructorCreatorResponseDTOImpl();
				updateCourseByInstructorCreatorResponseDTO.designation =
					creator.designation;
				updateCourseByInstructorCreatorResponseDTO.firstName =
					creator.firstName;
				updateCourseByInstructorCreatorResponseDTO.lastName =
					creator.lastName;
				updateCourseByInstructorCreatorResponseDTO.profilePicture =
					creator.profilePicture;

				this._updateCourseByInstructorResponseDTO.creators
					.push(updateCourseByInstructorCreatorResponseDTO);
			});

			this._updateCourseByInstructorResponseDTO.description =
				updatedCourseEntity.description;
			this._updateCourseByInstructorResponseDTO.id =
				updatedCourseEntity.id;
			this._updateCourseByInstructorResponseDTO
				.image = updatedCourseEntity.image;
			updatedCourseEntity.languages.forEach(language => {
				this._updateCourseByInstructorResponseDTO
					.languages.push(language);
			});
			this._updateCourseByInstructorResponseDTO.lastUpdatedOn =
				updatedCourseEntity.lastUpdatedOn;

			updatedCourseEntity.materialsAndOffers.forEach(materialAndOffer => {
				this._updateCourseByInstructorResponseDTO.materialsAndOffers
					.push(materialAndOffer);
			});

			this._updateCourseByInstructorResponseDTO.price.currency =
				updatedCourseEntity.price.currency;
			this._updateCourseByInstructorResponseDTO.price.value =
				updatedCourseEntity.price.value;

			this._updateCourseByInstructorResponseDTO.rating = null;

			updatedCourseEntity.sections.forEach(section => {
				const updateCourseByInstructorSectionResponseDTO =
					new UpdateCourseByInstructorSectionResponseDTOImpl();
				updateCourseByInstructorSectionResponseDTO.id = section.id;

				section.lectures.forEach(lecture => {
					const updateCourseByInstructorSectionLectureResponseDTO =
						// eslint-disable-next-line max-len
						new UpdateCourseByInstructorSectionLectureResponseDTOImpl();
					updateCourseByInstructorSectionLectureResponseDTO
						.description = lecture.description;
					updateCourseByInstructorSectionLectureResponseDTO
						.duration = lecture.duration;
					updateCourseByInstructorSectionLectureResponseDTO
						.id = lecture.id;
					updateCourseByInstructorSectionLectureResponseDTO
						.link = lecture.link;
					updateCourseByInstructorSectionLectureResponseDTO
						.order = lecture.order;

					lecture.subtitles.forEach(subtitle => {
						// eslint-disable-next-line max-len
						const updateCourseByInstructorSectionLectureSubtitleResponseDTO =
							// eslint-disable-next-line max-len
							new UpdateCourseByInstructorSectionLectureSubtitleResponseDTOImpl();

						// eslint-disable-next-line max-len
						updateCourseByInstructorSectionLectureSubtitleResponseDTO
							.language = subtitle.language;
						// eslint-disable-next-line max-len
						updateCourseByInstructorSectionLectureSubtitleResponseDTO
							.url = subtitle.url;

						updateCourseByInstructorSectionLectureResponseDTO
							.subtitles
							// eslint-disable-next-line max-len
							.push(updateCourseByInstructorSectionLectureSubtitleResponseDTO);
					});

					updateCourseByInstructorSectionLectureResponseDTO
						.thumbnail = lecture.thumbnail;
					updateCourseByInstructorSectionLectureResponseDTO
						.title = lecture.title;

					updateCourseByInstructorSectionResponseDTO.lectures
						.push(
							updateCourseByInstructorSectionLectureResponseDTO
						);
				});

				updateCourseByInstructorSectionResponseDTO.lecturesCount =
					section.lecturesCount;
				updateCourseByInstructorSectionResponseDTO.lecturesDuration =
					section.lecturesDuration;
				updateCourseByInstructorSectionResponseDTO.order =
					section.order;
				updateCourseByInstructorSectionResponseDTO.title =
					section.title;

				this._updateCourseByInstructorResponseDTO.sections
					.push(updateCourseByInstructorSectionResponseDTO);
			});

			this._updateCourseByInstructorResponseDTO.status =
				updatedCourseEntity.status;

			updatedCourseEntity.subtitles.forEach(subtitle => {
				this._updateCourseByInstructorResponseDTO
					.subtitles.push(subtitle);
			});

			this._updateCourseByInstructorResponseDTO
				.title = updatedCourseEntity.title;
			this._updateCourseByInstructorResponseDTO.totalDuration =
				updatedCourseEntity.totalDuration;
			this._updateCourseByInstructorResponseDTO.totalLecturesCount =
				updatedCourseEntity.totalLecturesCount;
			this._updateCourseByInstructorResponseDTO.totalSectionsCount =
				updatedCourseEntity.totalSectionsCount;
			this._updateCourseByInstructorResponseDTO.totalStudents =
				updatedCourseEntity.totalStudents;

			await this._unitOfWork.complete();

			return this._updateCourseByInstructorResponseDTO;
		} catch (error) {
			await this._unitOfWork.dispose();

			throw error;
		}
	}
}