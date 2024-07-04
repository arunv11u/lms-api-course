import { ObjectId } from "mongodb";


export class CourseSectionORMEntity {
	_id: ObjectId;
	course: ObjectId;
	title: string;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: ObjectId;
	lastModifiedBy: ObjectId;
	isDeleted: boolean;
	version: number;
}