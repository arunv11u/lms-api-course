import { ObjectId } from "mongodb";

export class CourseTranscodingCompletedRegistryORMEntity {
	_id: string;
	courseId: ObjectId;
	lectureIds: ObjectId[];
	creationDate: Date;
	version: number;
}