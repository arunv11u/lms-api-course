import { ObjectId } from "mongodb";
import { CourseSectionLectureStatuses } from "../../domain";


export class CourseSectionLectureORMEntity {
	_id: ObjectId;
	status: CourseSectionLectureStatuses;
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