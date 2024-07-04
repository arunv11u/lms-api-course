import { ObjectId } from "mongodb";
import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { CourseLearningORMEntity } from "./course-learning.orm-entity";



export class CourseLearningRepositoryImpl {
	private _collectionName = "course-learnings";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async getAllWithCourseId(
		courseId: string
	): Promise<string[]> {
		const courseLearningsORMEntity = await this._mongodbRepository
			.find<CourseLearningORMEntity>(
				this._collectionName,
				{
					course: new ObjectId(courseId)
				}
			);

		const courseLearnings = courseLearningsORMEntity
			.map(
				(courseLearningORMEntity) => {
					return courseLearningORMEntity.learning;
				});

		return courseLearnings;
	}
}