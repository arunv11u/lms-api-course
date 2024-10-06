import nconf from "nconf";
import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
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
	CourseEntity,
	CourseObject,
	CoursePriceEntity,
	CourseRatingEntity,
	CourseRepository
} from "../../domain";
import { CourseFactory } from "../../factory";
import { CourseORMEntity } from "./course.orm-entity";
// import { CourseCreatorRepositoryImpl } from "./course-creator.repository";
import { CourseLanguageRepositoryImpl } from "./course-language.repository";
import { CourseLearningRepositoryImpl } from "./course-learning.repository";
import { CourseMaterialAndOfferRepositoryImpl } from "./course-material-and-offer.repository";
import { CourseRatingRepositoryImpl } from "./course-rating.repository";
import { CourseSectionRepositoryImpl } from "./course-section.repository";
import { CourseSubtitleRepositoryImpl } from "./course-subtitle.repository";
import { CourseStudentRepositoryImpl } from "./course-student.repository";
import { CourseSectionLectureRepositoryImpl } from "./course-section-lecture.repository";



export class CourseRepositoryImpl implements CourseRepository, CourseObject {
	private _collectionName = "courses";
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

	async getAll(): Promise<DocsCountList<CourseEntity>> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const coursesORMEntity = await this._mongodbRepository
			.find<CourseORMEntity>(
				this._collectionName,
				{}
			);


		const coursesPromises = coursesORMEntity
			.map(async (courseORMEntity) => {
				const courseEntity = await this._getEntity(courseORMEntity);

				return courseEntity;
			});

		const courses = await Promise.all(coursesPromises);

		const docsCountList = new DocsCountListImpl<CourseEntity>();
		docsCountList.count = courses.length;
		docsCountList.docs = courses;

		return docsCountList;
	}

	async uploadCourseImage(
		mimeType: string
	): Promise<UploadPreSignedURLResponse> {
		const extension = getExtensionFromMimeType(mimeType);
		const filename = `${getUUIDV4()}.${extension}`;
		const filePath = `public/courses/images/${filename}`;
		const s3Storage = getS3Storage(nconf.get("s3BucketName"));

		const response = await s3Storage
			.getPreSignedUrlForUploading(filePath, 300, 2 * 1024 * 1024);

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

	private async _getEntity(
		courseORMEntity: CourseORMEntity
	): Promise<CourseEntity> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		// const courseCreatorRepository = new CourseCreatorRepositoryImpl(
		// 	this._mongodbRepository
		// );
		const courseLanguageRepository = new CourseLanguageRepositoryImpl(
			this._mongodbRepository
		);
		const courseLearningRepository = new CourseLearningRepositoryImpl(
			this._mongodbRepository
		);
		const courseMaterialAndOfferRepository =
			new CourseMaterialAndOfferRepositoryImpl(
				this._mongodbRepository
			);
		const courseRatingRepository = new CourseRatingRepositoryImpl(
			this._mongodbRepository
		);
		const courseSectionRepository = new CourseSectionRepositoryImpl(
			this._mongodbRepository
		);
		const courseSubtitleRepository = new CourseSubtitleRepositoryImpl(
			this._mongodbRepository
		);
		const courseStudentRepository = new CourseStudentRepositoryImpl(
			this._mongodbRepository
		);
		const courseSectionLectureRepository =
			new CourseSectionLectureRepositoryImpl(
				this._mongodbRepository
			);

		const courseId = courseORMEntity._id.toString();

		const courseEntity = this._courseFactory.make("CourseEntity") as CourseEntity;
		const coursePriceEntity = this._courseFactory.make("CoursePriceEntity") as CoursePriceEntity;
		const courseRatingEntity = this._courseFactory.make("CourseRatingEntity") as CourseRatingEntity;

		// courseEntity.creators = await courseCreatorRepository
		// 	.getAllWithCourseId(courseId);
		courseEntity.description = courseORMEntity.description;
		courseEntity.id = courseORMEntity._id.toString();
		courseEntity.image = courseORMEntity.image;
		courseEntity.languages = await courseLanguageRepository
			.getAllWithCourseId(courseId);
		courseEntity.lastUpdatedOn = new Date(courseORMEntity.lastUpdatedOn);
		courseEntity.learnings = await courseLearningRepository
			.getAllWithCourseId(courseId);
		courseEntity.materialsAndOffers = await courseMaterialAndOfferRepository
			.getAllWithCourseId(courseId);

		coursePriceEntity.currency = courseORMEntity.currency;
		coursePriceEntity.value = courseORMEntity.price;
		courseEntity.price = coursePriceEntity;

		courseRatingEntity.totalCount = await courseRatingRepository
			.getTotalCountWithCourseId(courseId);
		courseRatingEntity.value = await courseRatingRepository
			.getRatingsWithCourseId(courseId);
		courseEntity.rating = courseRatingEntity;

		courseEntity.sections = await courseSectionRepository
			.getAllWithCourseId(courseId);

		courseEntity.subtitles = await courseSubtitleRepository
			.getAllWithCourseId(courseId);

		courseEntity.title = courseORMEntity.title;

		courseEntity.totalDuration = await courseSectionLectureRepository
			.getTotalDurationWithCourseId(courseId);

		courseEntity.totalLecturesCount = await courseSectionLectureRepository
			.getTotalLecturesCountWithCourseId(courseId);

		courseEntity.totalSectionsCount = await courseSectionRepository
			.getTotalSectionsCountWithCourseId(courseId);

		courseEntity.totalStudents = await courseStudentRepository
			.getTotalStudentsCountWithCourseId(courseId);

		return courseEntity;
	}
}