import { ObjectId } from "mongodb";



export class CourseLearningORMEntity {
	_id: ObjectId;
	course: ObjectId;
	learning: string;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: ObjectId;
	lastModifiedBy: ObjectId;
	isDeleted: boolean;
	version: number;
}