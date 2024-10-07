import { ObjectId } from "mongodb";


export class CourseSectionORMEntity {
	_id: ObjectId;
	course: ObjectId;
	title: string;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: string;
	lastModifiedBy: string;
	isDeleted: boolean;
	version: number;
}