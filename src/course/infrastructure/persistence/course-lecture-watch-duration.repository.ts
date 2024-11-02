import { ObjectId } from "mongodb";
import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { CourseLectureWatchDurationORMEntity } from "./course-lecture-watch-duration.orm-entity";
import { ErrorCodes, GenericError } from "../../../utils";



export class CourseLectureWatchDurationRepositoryImpl {
	private _collectionName = "course-lecture-watch-durations";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	// eslint-disable-next-line max-params
	async updateCourseLectureWatchDuration(
		studentId: string,
		courseId: string,
		lectureId: string,
		duration: number
	): Promise<void> {
		if (!await this._isCourseLectureWatchDurationExists(
			studentId,
			courseId,
			lectureId
		)) {
			await this._addCourseLectureWatchDuration(
				studentId,
				courseId,
				lectureId,
				duration
			);
		} else {
			await this._mongodbRepository
				.update<CourseLectureWatchDurationORMEntity>(
					this._collectionName,
					{
						studentId: studentId,
						courseId: new ObjectId(courseId),
						lectureId: new ObjectId(lectureId)
					},
					{
						$set: { duration: duration },
						$inc: { version: 1 }
					}
				);
		}
	}

	async getCourseLectureWatchDuration(
		studentId: string,
		courseId: string,
		lectureId: string
	): Promise<number> {
		const courseLectureWatchDurationORMEntity =
			await this._mongodbRepository
				.findOne<CourseLectureWatchDurationORMEntity>(
					this._collectionName,
					{
						studentId: studentId,
						courseId: new ObjectId(courseId),
						lectureId: new ObjectId(lectureId)
					}
				);

		if (!courseLectureWatchDurationORMEntity)
			throw new GenericError({
				code: ErrorCodes.courseLectureNotFound,
				error: new Error("Course, lecture not found"),
				errorCode: 404
			});

		return courseLectureWatchDurationORMEntity.duration;
	}

	private async _isCourseLectureWatchDurationExists(
		studentId: string,
		courseId: string,
		lectureId: string,
	): Promise<boolean> {
		const courseLectureWatchDuration = await this._mongodbRepository
			.findOne<CourseLectureWatchDurationORMEntity>(
				this._collectionName,
				{
					studentId: studentId,
					courseId: new ObjectId(courseId),
					lectureId: new ObjectId(lectureId)
				}
			);

		if (!courseLectureWatchDuration) return false;

		return true;
	}

	// eslint-disable-next-line max-params
	private async _addCourseLectureWatchDuration(
		studentId: string,
		courseId: string,
		lectureId: string,
		duration: number
	): Promise<void> {
		const courseLectureWatchDurationORMEntity =
			new CourseLectureWatchDurationORMEntity();

		courseLectureWatchDurationORMEntity._id = new ObjectId();
		courseLectureWatchDurationORMEntity.courseId = new ObjectId(courseId);
		courseLectureWatchDurationORMEntity.createdBy = studentId;
		courseLectureWatchDurationORMEntity.creationDate = new Date();
		courseLectureWatchDurationORMEntity.duration = duration;
		courseLectureWatchDurationORMEntity.isDeleted = false;
		courseLectureWatchDurationORMEntity.lastModifiedBy = studentId;
		courseLectureWatchDurationORMEntity.lastModifiedDate = new Date();
		courseLectureWatchDurationORMEntity.lectureId = new ObjectId(lectureId);
		courseLectureWatchDurationORMEntity.studentId = studentId;
		courseLectureWatchDurationORMEntity.version = 1;

		await this._mongodbRepository.add<CourseLectureWatchDurationORMEntity>(
			this._collectionName,
			courseLectureWatchDurationORMEntity
		);
	}
}