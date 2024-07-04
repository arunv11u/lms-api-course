import { ObjectId } from "mongodb";



export class CourseStudentORMEntity {
	_id: ObjectId;
	course: ObjectId;
	student: ObjectId;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: ObjectId;
	lastModifiedBy: ObjectId;
	isDeleted: boolean;
	version: number;
}