import { ObjectId } from "mongodb";
import { CourseSubtitles } from "../../domain";



export class CourseSubtitleORMEntity {
	_id: ObjectId;
	course: ObjectId;
	subtitle: CourseSubtitles;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: string;
	lastModifiedBy: string;
	isDeleted: boolean;
	version: number;
}