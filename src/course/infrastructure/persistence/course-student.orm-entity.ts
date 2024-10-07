import { ObjectId } from "mongodb";



export class CourseStudentORMEntity {
	_id: ObjectId;
	course: ObjectId;
	student: ObjectId;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: string;
	lastModifiedBy: string;
	isDeleted: boolean;
	version: number;
}