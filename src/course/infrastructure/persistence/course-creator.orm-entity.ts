import { ObjectId } from "mongodb";



export class CourseCreatorORMEntity {
	_id: ObjectId;
	course: ObjectId;
	creator: string;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: string;
	lastModifiedBy: string;
	isDeleted: boolean;
	version: number;
}