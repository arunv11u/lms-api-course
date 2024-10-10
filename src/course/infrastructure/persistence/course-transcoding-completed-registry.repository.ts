import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { CourseTranscodingCompletedRegistryORMEntity } from "./course-transcoding-completed-registry.orm-entity";
import { ObjectId } from "mongodb";


export class CourseTranscodingCompletedRegistryRepositoryImpl {
	private _collectionName = "course-transcoding-completed-registry";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async hasLecturesTranscodedWithId(id: string): Promise<boolean> {
		const isTranscoded = await this._mongodbRepository
			.findOne<CourseTranscodingCompletedRegistryORMEntity>(
				this._collectionName,
				{ _id: id }
			);

		if (isTranscoded) return true;

		return false;
	}

	// eslint-disable-next-line max-params
	async create(
		id: string,
		courseId: string,
		lectureIds: string[]
	): Promise<void> {

		const courseTranscodingCompletedORMEntity =
			new CourseTranscodingCompletedRegistryORMEntity();
		courseTranscodingCompletedORMEntity._id = id;
		courseTranscodingCompletedORMEntity.courseId = new ObjectId(courseId);
		courseTranscodingCompletedORMEntity.creationDate = new Date();

		const lectureObjectIds = lectureIds.map(
			lectureId => new ObjectId(lectureId)
		);
		courseTranscodingCompletedORMEntity.lectureIds = lectureObjectIds;
		courseTranscodingCompletedORMEntity.version = 1;

		await this._mongodbRepository
			.add<CourseTranscodingCompletedRegistryORMEntity>(
				this._collectionName,
				courseTranscodingCompletedORMEntity
			);
	}
}