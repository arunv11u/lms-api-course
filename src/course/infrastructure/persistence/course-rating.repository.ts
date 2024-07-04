import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { CourseRatingORMEntity } from "./course-rating.orm-entity";
import { ObjectId } from "mongodb";



export class CourseRatingRepositoryImpl {
	private _collectionName = "course-ratings";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async getTotalCountWithCourseId(
		courseId: string
	): Promise<number> {
		const courseRatingsORMEntity = await this._mongodbRepository
			.find<CourseRatingORMEntity>(
				this._collectionName,
				{
					course: new ObjectId(courseId)
				}
			);

		return courseRatingsORMEntity.length;
	}

	async getRatingsWithCourseId(courseId: string): Promise<number> {
		const courseRatingsORMEntity = await this._mongodbRepository
			.find<CourseRatingORMEntity>(
				this._collectionName,
				{
					course: new ObjectId(courseId)
				}
			);

		let ratingsSum = 0;
		const totalRatingsCount = courseRatingsORMEntity.length;

		courseRatingsORMEntity.forEach(courseRating => {
			ratingsSum += courseRating.rating;
		});

		const ratings = Math.floor((ratingsSum / totalRatingsCount) * 10) / 10;

		return ratings;
	}
}