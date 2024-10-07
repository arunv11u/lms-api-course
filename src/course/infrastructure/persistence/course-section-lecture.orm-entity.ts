import { ObjectId } from "mongodb";


export class CourseSectionLectureORMEntity {
	_id: ObjectId;
	course: ObjectId;
	section: ObjectId;
	title: string;
	description: string;
	duration: number;
	link: string;
	thumbnail: string | null = null;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: string;
	lastModifiedBy: string;
	isDeleted: boolean;
	version: number;
}