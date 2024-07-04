import { ObjectId } from "mongodb";



export class CourseCreatorORMEntity {
	_id: ObjectId;
	course: ObjectId;
	name: string;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: ObjectId;
	lastModifiedBy: ObjectId;
	isDeleted: boolean;
	version: number;
}