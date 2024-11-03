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

	async isCourseCreatedByInstructor(
		courseId: ObjectId,
		instructorId: string
	): Promise<boolean> {
		const creator = await this._mongodbRepository
			.findOne<CourseCreatorORMEntity>(
				this._collectionName,
				{
					course: courseId,
					creator: instructorId
				}
			);

		if (!creator) return false;

		return true;
	}

	async getAllCourseIdsCreatedByInstructor(
		instructorId: string
	): Promise<ObjectId[]> {
		const courseCreatorsORMEntity = await this._mongodbRepository
			.find<CourseCreatorORMEntity>(
				this._collectionName,
				{
					creator: instructorId
				}
			);

		const courseIds = courseCreatorsORMEntity
			.map(courseCreator => courseCreator.course);

		return courseIds;
	}
}