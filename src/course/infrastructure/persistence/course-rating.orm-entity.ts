import { ObjectId } from "mongodb";


export class CourseRatingORMEntity {
	_id: ObjectId;
	course: ObjectId;
	student: ObjectId;
	rating: number;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: ObjectId;
	lastModifiedBy: ObjectId;
	isDeleted: boolean;
	version: number;
}