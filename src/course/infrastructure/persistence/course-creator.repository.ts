import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { CourseCreatorORMEntity } from "./course-creator.orm-entity";
import { ObjectId } from "mongodb";



export class CourseCreatorRepositoryImpl {
	private _collectionName = "course-creators";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async getAllWithCourseId(
		courseId: string
	): Promise<string[]> {
		const courseCreatorsORMEntity = await this._mongodbRepository
			.find<CourseCreatorORMEntity>(
				this._collectionName,
				{
					course: new ObjectId(courseId)
				}
			);

		const courseCreators = courseCreatorsORMEntity
			.map(
				(courseCreatorORMEntity) => {
					return courseCreatorORMEntity.name;
				});

		return courseCreators;
	}
}