/* eslint-disable max-lines */
import nconf from "nconf";
import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { MongoDBPaginatorImpl } from "@arunvaradharajalu/common.mongodb-paginator";
import { ObjectId } from "mongodb";
import {
	DocsCountList,
	DocsCountListImpl,
	ErrorCodes,
	GenericError,
	getExtensionFromMimeType,
	getS3Storage,
	getUUIDV4,
	UploadPreSignedURLResponse
} from "../../../utils";
import { getCourseFactory } from "../../../global-config";
import {
	CourseCreatorValueObject,
	CourseEntity,
	CourseObject,
	CoursePaginationValueObject,
	CourseRepository,
	CourseSectionValueObject,
	CourseStatuses
} from "../../domain";
import { CourseFactory } from "../../factory";
import { CourseORMEntity, ViewCourseORMEntity } from "./course.orm-entity";
import { CourseCreatorRepositoryImpl } from "./course-creator.repository";
import { CourseLanguageRepositoryImpl } from "./course-language.repository";
import { CourseLearningRepositoryImpl } from "./course-learning.repository";
import { CourseMaterialAndOfferRepositoryImpl } from "./course-material-and-offer.repository";
import { CourseSectionLectureRepositoryImpl } from "./course-section-lecture.repository";
import { CourseSectionRepositoryImpl } from "./course-section.repository";
import { CourseSubtitleRepositoryImpl } from "./course-subtitle.repository";
import { CourseTranscodingCompletedRegistryRepositoryImpl } from "./course-transcoding-completed-registry.repository";
import { CourseCategoryRepositoryImpl } from "./course-category.repository";



export class CourseRepositoryImpl implements CourseRepository, CourseObject {
	private _collectionName = "courses";
	private _viewCollectionName = "view-courses";
	private _mongodbRepository: MongoDBRepository | null = null;
	private _courseFactory: CourseFactory;

	constructor() {
		this._courseFactory = getCourseFactory();
	}

	set mongoDBRepository(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	getId(): string {
		return new ObjectId().toString();
	}

	getSectionId(): string {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const courseSectionRepository =
			new CourseSectionRepositoryImpl(this._mongodbRepository);

		return courseSectionRepository.getId();
	}

	getSectionLectureId(): string {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const courseSectionLectureRepository =
			new CourseSectionLectureRepositoryImpl(this._mongodbRepository);

		return courseSectionLectureRepository.getId();
	}

	async uploadCourseImage(
		mimeType: string
	): Promise<UploadPreSignedURLResponse> {
		const extension = getExtensionFromMimeType(mimeType);
		const filename = `${getUUIDV4()}.${extension}`;
		const filePath = `public/courses/images/${filename}`;
		const s3Storage = getS3Storage(nconf.get("s3BucketName"));

		const response = await s3Storage
			.getPreSignedUrlForUploading(filePath, 5 * 60, 2 * 1024 * 1024);

		return response;
	}

	async uploadLectureVideo(
		mimeType: string
	): Promise<UploadPreSignedURLResponse> {
		const extension = getExtensionFromMimeType(mimeType);
		const filename = `${getUUIDV4()}.${extension}`;
		const filePath = `public/courses/raw-lectures/${filename}`;
		const s3Storage = getS3Storage(nconf.get("s3BucketName"));

		const response = await s3Storage
			.getPreSignedUrlForUploading(
				filePath,
				24 * 60 * 60,
				2 * 1024 * 1024 * 1024
			);

		return response;
	}

	async uploadLectureSubtitle(
		mimeType: string
	): Promise<UploadPreSignedURLResponse> {
		const extension = getExtensionFromMimeType(mimeType);
		const filename = `${getUUIDV4()}.${extension}`;
		const filePath = `public/courses/raw-lectures/${filename}`;
		const s3Storage = getS3Storage(nconf.get("s3BucketName"));

		const response = await s3Storage
			.getPreSignedUrlForUploading(
				filePath,
				5 * 60,
				2 * 1024 * 1024
			);

		return response;
	}

	async createCourseByInstructor(
		course: CourseEntity,
		instructorId: string
	): Promise<CourseEntity> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});


		const isCourseTitleAlreadyExists =
			await this._isCourseTitleAlreadyExists(course.title);

		if (isCourseTitleAlreadyExists)
			throw new GenericError({
				code: ErrorCodes.courseTitleAlreadyExists,
				error: new Error("Course title already exists"),
				errorCode: 403
			});

		const courseCreatorRepository =
			new CourseCreatorRepositoryImpl(this._mongodbRepository);
		const courseLanguageRepository =
			new CourseLanguageRepositoryImpl(this._mongodbRepository);
		const courseLearningRepository =
			new CourseLearningRepositoryImpl(this._mongodbRepository);
		const courseMaterialAndOfferRepository =
			new CourseMaterialAndOfferRepositoryImpl(this._mongodbRepository);
		const courseSectionLectureRepository =
			new CourseSectionLectureRepositoryImpl(this._mongodbRepository);
		const courseSectionRepository =
			new CourseSectionRepositoryImpl(this._mongodbRepository);
		const courseSubtitleRepository =
			new CourseSubtitleRepositoryImpl(this._mongodbRepository);

		await courseCreatorRepository
			.addCreatorsByInstructor(course, instructorId);
		await courseLanguageRepository
			.addLanguagesByInstructor(course, instructorId);
		await courseLearningRepository
			.addLearningsByInstructor(course, instructorId);
		await courseMaterialAndOfferRepository
			.addCourseMaterialsAndOffersByInstructor(course, instructorId);
		await courseSectionLectureRepository
			.addLecturesByInstructor(course, instructorId);
		await courseSectionRepository
			.addSectionsByInstructor(course, instructorId);
		await courseSubtitleRepository
			.addSubtitlesByInstructor(course, instructorId);


		const courseORMEntity = new CourseORMEntity();
		courseORMEntity._id = new ObjectId(course.id);
		courseORMEntity.category = course.category;
		courseORMEntity.createdBy = instructorId;
		courseORMEntity.creationDate = new Date();
		courseORMEntity.currency = course.price.currency;
		courseORMEntity.description = course.description;
		courseORMEntity.image = course.image;
		courseORMEntity.isDeleted = false;
		courseORMEntity.lastModifiedBy = instructorId;
		courseORMEntity.lastModifiedDate = new Date(course.lastUpdatedOn);
		courseORMEntity.price = course.price.value;
		courseORMEntity.title = course.title;
		courseORMEntity.version = 1;

		await this._mongodbRepository.add<CourseORMEntity>(
			this._collectionName,
			courseORMEntity
		);

		return course;
	}

	// eslint-disable-next-line max-params
	async completeTranscodingForLecture(
		lectureId: string,
		lectureUrl: string,
		thumbnailUrl: string,
		duration: number
	): Promise<void> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const courseSectionLectureRepository =
			new CourseSectionLectureRepositoryImpl(this._mongodbRepository);

		await courseSectionLectureRepository
			.markLectureAsTranscoded(
				lectureId,
				lectureUrl,
				thumbnailUrl,
				duration
			);
	}

	async addTranscodedLecturesToCourseTranscodingCompletedRegistry(
		id: string,
		courseId: string,
		lectureIds: string[]
	): Promise<void> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const courseTranscodingCompletedRegistryRepository =
			new CourseTranscodingCompletedRegistryRepositoryImpl(
				this._mongodbRepository
			);

		await courseTranscodingCompletedRegistryRepository
			.create(id, courseId, lectureIds);
	}

	async exploreAllCourses(
		searchString: string | null,
		categories: string[],
		pagination: CoursePaginationValueObject
	): Promise<DocsCountList<CourseEntity>> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const courseDocsCountList = new DocsCountListImpl<CourseEntity>();
		const courseIds = [];

		if (searchString) {
			const coursesMatchesSearchString = await this._mongodbRepository
				.aggregate(this._collectionName, [
					{
						$search: {
							index: "courses_title_search_v1",
							"autocomplete": {
								"query": searchString,
								"path": "title",
								"fuzzy": {
									"maxEdits": 1
								}
							}
						}
					},
					{
						$group: {
							_id: null,
							ids: { $addToSet: "$_id" }
						}
					}
				]);

			if (coursesMatchesSearchString[0])
				courseIds.push(...coursesMatchesSearchString[0].ids);

			if (!courseIds.length) {
				courseDocsCountList.docs = [];
				courseDocsCountList.count = 0;

				return courseDocsCountList;
			}
		}

		const paginationRepository = new MongoDBPaginatorImpl(
			this._mongodbRepository
		);

		const courseMatchQueries = [];

		if (courseIds.length)
			courseMatchQueries.push({ _id: { $in: courseIds } });

		if (categories.length)
			courseMatchQueries.push({ category: { $in: categories } });

		const courses = await paginationRepository
			.find<ViewCourseORMEntity>(
				this._viewCollectionName,
				{
					$and: [
						...courseMatchQueries,
						{
							status:
								{ $eq: CourseStatuses.transcodingCompleted }
						},
						{ isDeleted: { $eq: false } }
					]
				},
				{
					pageIndex: pagination.pageIndex,
					pageSize: pagination.pageSize,
					sortField: pagination.sortField,
					sortType: pagination.sortType,
					collationOptions: null
				}
			);

		courses.docs.forEach(course => {
			const courseEntity = this._courseFactory.make("CourseEntity") as CourseEntity;

			course.creators.forEach(creator => {
				const courseCreatorValueObject = new CourseCreatorValueObject();
				courseCreatorValueObject.designation = creator.designation;
				courseCreatorValueObject.firstName = creator.firstName;
				courseCreatorValueObject.id = creator._id;
				courseCreatorValueObject.lastName = creator.lastName;
				courseCreatorValueObject.profilePicture =
					creator.profilePicture;

				courseEntity.addCreator(courseCreatorValueObject);
			});

			course.languages.forEach(language => {
				courseEntity.addLanguage(language.language);
			});

			course.learnings.forEach(learning => {
				courseEntity.addLearning(learning.learning);
			});

			course.materialsAndOffers.forEach(materialAndOffer => {
				courseEntity.addMaterialAndOffer(
					materialAndOffer.materialAndOffer
				);
			});

			let totalDuration = 0;
			let totalLecturesCount = 0;
			course.sections.forEach(section => {
				const courseSectionValueObject = new CourseSectionValueObject();
				courseSectionValueObject.id = section._id.toString();

				let lectureDuration = 0;
				section.lectures.forEach(lecture => {
					lectureDuration += lecture.duration;

					courseSectionValueObject.lectures.push({
						description: lecture.description,
						duration: lecture.duration,
						id: lecture._id.toString(),
						link: lecture.link,
						order: lecture.order,
						status: lecture.status,
						subtitles: [],
						thumbnail: lecture.thumbnail,
						title: lecture.title
					});
				});

				totalDuration += lectureDuration;
				totalLecturesCount += section.lectures.length;

				courseSectionValueObject.lecturesCount =
					section.lectures.length;
				courseSectionValueObject.lecturesDuration = lectureDuration;
				courseSectionValueObject.order = section.order;
				courseSectionValueObject.title = section.title;

				courseEntity.addSection(courseSectionValueObject);
			});

			course.subtitles.forEach(subtitle => {
				courseEntity.addSubtitle(subtitle.subtitle);
			});

			courseEntity.category = course.category;
			courseEntity.description = course.description;
			courseEntity.id = course._id.toString();
			courseEntity.image = course.image;
			courseEntity.lastUpdatedOn = course.lastModifiedDate;

			courseEntity.setPrice(course.currency, course.price);

			courseEntity.status = CourseStatuses.transcodingCompleted;
			courseEntity.title = course.title;
			courseEntity.totalDuration = totalDuration;
			courseEntity.totalLecturesCount = totalLecturesCount;
			courseEntity.totalSectionsCount = course.sections.length;
			courseEntity.totalStudents = 0;

			courseDocsCountList.docs.push(courseEntity);
		});
		courseDocsCountList.count = courses.count;

		return courseDocsCountList;
	}

	async getAllCourseCategories(): Promise<DocsCountList<string>> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const courseCategoriesDocsCountList = new DocsCountListImpl<string>();

		const courseCategoryRepository =
			new CourseCategoryRepositoryImpl(this._mongodbRepository);

		const courseCategories = await courseCategoryRepository.getAll();
		courseCategoriesDocsCountList.docs = courseCategories;
		courseCategoriesDocsCountList.count = courseCategories.length;

		return courseCategoriesDocsCountList;
	}

	async exploreACourse(courseId: string): Promise<CourseEntity> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const course = await this._mongodbRepository
			.findOne<ViewCourseORMEntity>(
				this._viewCollectionName,
				{
					_id: new ObjectId(courseId),
					status: CourseStatuses.transcodingCompleted,
					isDeleted: false
				}
			);

		if (!course)
			throw new GenericError({
				code: ErrorCodes.courseNotFound,
				error: new Error("Course not found"),
				errorCode: 404
			});

		const courseEntity = this._courseFactory.make("CourseEntity") as CourseEntity;

		course.creators.forEach(creator => {
			const courseCreatorValueObject = new CourseCreatorValueObject();
			courseCreatorValueObject.designation = creator.designation;
			courseCreatorValueObject.firstName = creator.firstName;
			courseCreatorValueObject.id = creator._id;
			courseCreatorValueObject.lastName = creator.lastName;
			courseCreatorValueObject.profilePicture =
				creator.profilePicture;

			courseEntity.addCreator(courseCreatorValueObject);
		});

		course.languages.forEach(language => {
			courseEntity.addLanguage(language.language);
		});

		course.learnings.forEach(learning => {
			courseEntity.addLearning(learning.learning);
		});

		course.materialsAndOffers.forEach(materialAndOffer => {
			courseEntity.addMaterialAndOffer(
				materialAndOffer.materialAndOffer
			);
		});

		let totalDuration = 0;
		let totalLecturesCount = 0;
		course.sections.forEach(section => {
			const courseSectionValueObject = new CourseSectionValueObject();
			courseSectionValueObject.id = section._id.toString();

			let lectureDuration = 0;
			section.lectures.forEach(lecture => {
				lectureDuration += lecture.duration;

				courseSectionValueObject.lectures.push({
					description: lecture.description,
					duration: lecture.duration,
					id: lecture._id.toString(),
					link: lecture.link,
					order: lecture.order,
					status: lecture.status,
					subtitles: [],
					thumbnail: lecture.thumbnail,
					title: lecture.title
				});
			});

			totalDuration += lectureDuration;
			totalLecturesCount += section.lectures.length;

			courseSectionValueObject.lecturesCount =
				section.lectures.length;
			courseSectionValueObject.lecturesDuration = lectureDuration;
			courseSectionValueObject.order = section.order;
			courseSectionValueObject.title = section.title;

			courseEntity.addSection(courseSectionValueObject);
		});

		course.subtitles.forEach(subtitle => {
			courseEntity.addSubtitle(subtitle.subtitle);
		});

		courseEntity.category = course.category;
		courseEntity.description = course.description;
		courseEntity.id = course._id.toString();
		courseEntity.image = course.image;
		courseEntity.lastUpdatedOn = course.lastModifiedDate;

		courseEntity.setPrice(course.currency, course.price);

		courseEntity.status = CourseStatuses.transcodingCompleted;
		courseEntity.title = course.title;
		courseEntity.totalDuration = totalDuration;
		courseEntity.totalLecturesCount = totalLecturesCount;
		courseEntity.totalSectionsCount = course.sections.length;
		courseEntity.totalStudents = 0;

		return courseEntity;
	}

	private async _isCourseTitleAlreadyExists(title: string): Promise<boolean> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const course = await this._mongodbRepository
			.findOne<CourseORMEntity>(
				this._collectionName,
				{
					title: title,
					isDeleted: false
				}
			);

		if (!course) return false;

		return true;
	}

	private async _getEntity(
		courseORMEntity: CourseORMEntity
	): Promise<CourseEntity> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		throw new Error(JSON.stringify(courseORMEntity));
	}
}