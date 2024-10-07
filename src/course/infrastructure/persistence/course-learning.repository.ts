import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { CourseEntity } from "../../domain";
import { CourseLearningORMEntity } from "./course-learning.orm-entity";
import { ObjectId } from "mongodb";



export class CourseLearningRepositoryImpl {
	private _collectionName = "course-learnings";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async addLearningsByInstructor(
		courseEntity: CourseEntity,
		instructorId: string
	): Promise<void> {
		const courseLearningsORMEntity = courseEntity.learnings
			.map<CourseLearningORMEntity>(
				learning => ({
					_id: new ObjectId(),
					course: new ObjectId(courseEntity.id),
					createdBy: instructorId,
					creationDate: new Date(),
					isDeleted: false,
					lastModifiedBy: instructorId,
					lastModifiedDate: new Date(),
					learning: learning,
					version: 1
				})
			);

		await this._mongodbRepository.addRange<CourseLearningORMEntity>(
			this._collectionName,
			courseLearningsORMEntity
		);
	}
}