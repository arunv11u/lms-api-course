import { ObjectId } from "mongodb";
import { CourseSubtitles } from "../../domain";



export class CourseSubtitleORMEntity {
	_id: ObjectId;
	course: ObjectId;
	subtitle: CourseSubtitles;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: ObjectId;
	lastModifiedBy: ObjectId;
	isDeleted: boolean;
	version: number;
}