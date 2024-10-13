import { ObjectId } from "mongodb";


export class CourseSectionORMEntity {
	_id: ObjectId;
	course: ObjectId;
	title: string;
	order: number;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: string;
	lastModifiedBy: string;
	isDeleted: boolean;
	version: number;
}