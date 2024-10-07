import { ObjectId } from "mongodb";
import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { CourseEntity } from "../../domain";
import { CourseCreatorORMEntity } from "./course-creator.orm-entity";



export class CourseCreatorRepositoryImpl {
	private _collectionName = "course-creators";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async addCreatorsByInstructor(
		courseEntity: CourseEntity,
		instructorId: string
	): Promise<void> {

		const creatorsORMEntity = courseEntity.creators
			.map<CourseCreatorORMEntity>(creator => ({
				_id: new ObjectId(),
				course: new ObjectId(courseEntity.id),
				createdBy: instructorId,
				creationDate: new Date(),
				creator: creator.id,
				isDeleted: false,
				lastModifiedBy: instructorId,
				lastModifiedDate: new Date(),
				version: 1
			}));

		await this._mongodbRepository.addRange<CourseCreatorORMEntity>(
			this._collectionName,
			creatorsORMEntity
		);
	}
}