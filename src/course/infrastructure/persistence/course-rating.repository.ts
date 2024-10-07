import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";



export class CourseRatingRepositoryImpl {
	private _collectionName = "course-ratings";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}
}