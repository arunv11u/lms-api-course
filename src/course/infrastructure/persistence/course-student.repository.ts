import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";



export class CourseStudentRepositoryImpl {
	private _collectionName = "course-students";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}
}