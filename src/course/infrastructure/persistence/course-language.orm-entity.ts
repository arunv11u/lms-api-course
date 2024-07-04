import { ObjectId } from "mongodb";
import { CourseLanguages } from "../../domain";



export class CourseLanguageORMEntity {
	_id: ObjectId;
	course: ObjectId;
	language: CourseLanguages;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: ObjectId;
	lastModifiedBy: ObjectId;
	isDeleted: boolean;
	version: number;
}