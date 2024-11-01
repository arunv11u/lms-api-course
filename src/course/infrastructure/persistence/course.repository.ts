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
import { CourseStudentRepositoryImpl } from "./course-student.repository";
import { CourseLectureWatchDurationRepositoryImpl } from "./course-lecture-watch-duration.repository";



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
			courseEntity.totalStudents = course.totalStudents;

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
		courseEntity.totalStudents = course.totalStudents;

		return courseEntity;
	}

	async isCourseExists(id: string): Promise<boolean> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const course = await this._mongodbRepository
			.findOne<CourseORMEntity>(
				this._collectionName,
				{ _id: new ObjectId(id) }
			);

		if (!course) return false;

		return true;
	}

	async updateCourseByInstructor(
		course: CourseEntity,
		instructorId: string
	): Promise<CourseEntity> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const oldCourse = await this._getCourseWithId(course.id);
		if (oldCourse.status === CourseStatuses.transcodingInProgress)
			throw new GenericError({
				code: ErrorCodes.courseTranscodingInprogress,
				error: new Error("Course transcoding is still inprogress, so can't update the course now, please try later"),
				errorCode: 403
			});

		const courseORMEntity = new CourseORMEntity();
		courseORMEntity._id = new ObjectId(course.id);

		if (oldCourse.category !== course.category)
			courseORMEntity.category = course.category;

		if (oldCourse.price.currency !== course.price.currency)
			courseORMEntity.currency = course.price.currency;

		if (oldCourse.description !== course.description)
			courseORMEntity.description = course.description;

		if (oldCourse.image !== course.image)
			courseORMEntity.image = course.image;

		courseORMEntity.lastModifiedBy = instructorId;
		courseORMEntity.lastModifiedDate = new Date();

		if (oldCourse.price.value !== course.price.value)
			courseORMEntity.price = course.price.value;

		if (oldCourse.title !== course.title)
			courseORMEntity.title = course.title;

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

		await courseLanguageRepository
			.updateLanguagesByInstructor(oldCourse, course, instructorId);

		await courseLearningRepository
			.updateLearningsByInstructor(oldCourse, course, instructorId);

		await courseMaterialAndOfferRepository
			.updateCourseMaterialsAndOffersByInstructor(
				oldCourse,
				course,
				instructorId
			);

		await courseSectionLectureRepository
			.updateLecturesByInstructor(oldCourse, course, instructorId);

		await courseSectionRepository
			.updateSectionsByInstructor(oldCourse, course, instructorId);

		await courseSubtitleRepository
			.updateSubtitlesByInstructor(oldCourse, course, instructorId);

		await this._mongodbRepository.update<CourseORMEntity>(
			this._collectionName,
			{
				_id: new ObjectId(course.id)
			},
			{
				$set: courseORMEntity,
				$inc: { version: 1 }
			}
		);

		const updatedCourse = await this._getCourseWithId(course.id);

		return updatedCourse;
	}

	async getCourseWithId(courseId: string): Promise<CourseEntity> {
		const course = await this._getCourseWithId(courseId);

		return course;
	}

	async enrollStudentForCourses(
		studentId: string,
		courseIds: string[]
	): Promise<void> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const courseStudentRepository = new CourseStudentRepositoryImpl(
			this._mongodbRepository
		);

		const courseObjectIds = courseIds.map(
			courseId => new ObjectId(courseId)
		);

		await courseStudentRepository.enrollStudentForCourses(
			studentId,
			courseObjectIds
		);
	}

	async getMyLearnings(studentId: string): Promise<CourseEntity[]> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const courseStudentRepository = new CourseStudentRepositoryImpl(
			this._mongodbRepository
		);

		const courseIds = await courseStudentRepository
			.getEnrolledCourseIdsOfStudent(studentId);

		const coursesORMEntity = await this._mongodbRepository
			.find<ViewCourseORMEntity>(
				this._viewCollectionName,
				{
					_id: { $in: courseIds },
					status: CourseStatuses.transcodingCompleted
				}
			);

		const coursesEntity = coursesORMEntity.map<CourseEntity>(course => {
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

			courseEntity.status = course.status;
			courseEntity.title = course.title;
			courseEntity.totalDuration = totalDuration;
			courseEntity.totalLecturesCount = totalLecturesCount;
			courseEntity.totalSectionsCount = course.sections.length;
			courseEntity.totalStudents = course.totalStudents;

			return courseEntity;
		});

		return coursesEntity;
	}

	async isStudentEnrolledForCourse(
		courseId: string,
		studentId: string
	): Promise<boolean> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const courseStudentRepository = new CourseStudentRepositoryImpl(
			this._mongodbRepository
		);

		const isStudentEnrolledForCourse = courseStudentRepository
			.isStudentEnrolledForCourse(
				new ObjectId(courseId),
				studentId
			);

		return isStudentEnrolledForCourse;
	}

	async getMyCourse(courseId: string): Promise<CourseEntity> {
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
					_id: new ObjectId(courseId)
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

		courseEntity.status = course.status;
		courseEntity.title = course.title;
		courseEntity.totalDuration = totalDuration;
		courseEntity.totalLecturesCount = totalLecturesCount;
		courseEntity.totalSectionsCount = course.sections.length;
		courseEntity.totalStudents = course.totalStudents;

		return courseEntity;
	}

	async getCourseByInstructor(
		courseId: string,
		instructorId: string
	): Promise<CourseEntity> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const courseCreatorRepository = new CourseCreatorRepositoryImpl(
			this._mongodbRepository
		);

		if(!await courseCreatorRepository
			.isCourseCreatedByInstructor(
				new ObjectId(courseId),
				instructorId
			)
		) throw new GenericError({
			code: ErrorCodes.courseNotCreatedByInstructor,
			error: new Error("Course is not created by instructor"),
			errorCode: 403
		});

		const course = await this._mongodbRepository
			.findOne<ViewCourseORMEntity>(
				this._viewCollectionName,
				{
					_id: new ObjectId(courseId)
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

		courseEntity.status = course.status;
		courseEntity.title = course.title;
		courseEntity.totalDuration = totalDuration;
		courseEntity.totalLecturesCount = totalLecturesCount;
		courseEntity.totalSectionsCount = course.sections.length;
		courseEntity.totalStudents = course.totalStudents;

		return courseEntity;
	}

	// eslint-disable-next-line max-params
	async updateLectureWatchDuration(
		studentId: string,
		courseId: string,
		lectureId: string, 
		duration: number
	): Promise<void> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const courseLectureWatchDurationRepository = 
			new CourseLectureWatchDurationRepositoryImpl(
				this._mongodbRepository
			);

		await courseLectureWatchDurationRepository
			.updateCourseLectureWatchDuration(
				studentId,
				courseId,
				lectureId,
				duration
			);
	}

	private async _getCourseWithId(courseId: string): Promise<CourseEntity> {
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
		courseEntity.totalStudents = course.totalStudents;

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