import { ObjectId } from "mongodb";


export class CourseSectionLectureORMEntity {
	_id: ObjectId;
	course: ObjectId;
	section: ObjectId;
	title: string;
	description: string;
	duration: number;
	link: string;
	thumbnail: string;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: ObjectId;
	lastModifiedBy: ObjectId;
	isDeleted: boolean;
	version: number;
}