import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { ObjectId } from "mongodb";
import { CourseSectionLectureEntity } from "../../domain";
import { ErrorCodes, GenericError } from "../../../utils";
import { CourseFactory } from "../../factory";
import { getCourseFactory } from "../../../global-config";
import { CourseSectionLectureORMEntity } from "./course-section-lecture.orm-entity";



export class CourseSectionLectureRepositoryImpl {
	private _collectionName = "course-section-lectures";
	private _mongodbRepository: MongoDBRepository;
	private _courseFactory: CourseFactory;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;

		this._courseFactory = getCourseFactory();
	}

	getId(): string {
		throw new Error();
	}

	async getAllWithCourseIdAndSectionId(
		courseId: string,
		sectionId: string
	): Promise<CourseSectionLectureEntity[]> {
		const courseSectionLecturesORMEntity = await this._mongodbRepository
			.find<CourseSectionLectureORMEntity>(
				this._collectionName,
				{
					course: new ObjectId(courseId),
					section: new ObjectId(sectionId)
				}
			);

		const courseSectionLecturesPromises = courseSectionLecturesORMEntity
			.map(async (courseSectionLectureORMEntity) => {
				const courseSectionLecture =
					await this._getEntity(courseSectionLectureORMEntity);

				return courseSectionLecture;
			});

		const courseSectionLectures =
			await Promise.all(courseSectionLecturesPromises);

		return courseSectionLectures;
	}

	async getLecturesCountWithCourseIdAndSectionId(
		courseId: string,
		sectionId: string
	): Promise<number> {
		const courseSectionLectures = await this._mongodbRepository
			.find<CourseSectionLectureORMEntity>(
				this._collectionName,
				{
					course: new ObjectId(courseId),
					section: new ObjectId(sectionId)
				}
			);

		return courseSectionLectures.length;
	}

	async getLecturesDurationWithCourseIdAndSectionId(
		courseId: string,
		sectionId: string
	): Promise<number> {
		const courseSectionLectures = await this._mongodbRepository
			.find<CourseSectionLectureORMEntity>(
				this._collectionName,
				{
					course: new ObjectId(courseId),
					section: new ObjectId(sectionId)
				}
			);

		let lecturesDuration = 0;

		courseSectionLectures.forEach(courseSectionLecture => {
			lecturesDuration += courseSectionLecture.duration;
		});

		return lecturesDuration;
	}

	async getTotalLecturesCountWithCourseId(
		courseId: string
	): Promise<number> {
		const lectures = await this._mongodbRepository
			.find<CourseSectionLectureORMEntity>(
				this._collectionName,
				{
					course: new ObjectId(courseId)
				}
			);

		return lectures.length;
	}

	async getTotalDurationWithCourseId(
		courseId: string
	): Promise<number> {
		const lectures = await this._mongodbRepository
			.find<CourseSectionLectureORMEntity>(
				this._collectionName,
				{
					course: new ObjectId(courseId)
				}
			);

		let totalDuration = 0;

		lectures.forEach(lecture => {
			totalDuration += lecture.duration;
		});

		return totalDuration;
	}

	private async _getEntity(
		courseSectionLectureORMEntity: CourseSectionLectureORMEntity
	): Promise<CourseSectionLectureEntity> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const courseSectionLectureEntity = this._courseFactory
			.make("CourseSectionLectureEntity") as CourseSectionLectureEntity;
		courseSectionLectureEntity.description =
			courseSectionLectureORMEntity.description;
		courseSectionLectureEntity.duration =
			courseSectionLectureORMEntity.duration;
		courseSectionLectureEntity.id =
			courseSectionLectureORMEntity._id.toString();
		courseSectionLectureEntity.link = courseSectionLectureORMEntity.link;
		courseSectionLectureEntity.thumbnail =
			courseSectionLectureORMEntity.thumbnail;
		courseSectionLectureEntity.title = courseSectionLectureORMEntity.title;

		return courseSectionLectureEntity;
	}
}