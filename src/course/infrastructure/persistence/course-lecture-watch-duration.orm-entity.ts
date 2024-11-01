import { ObjectId } from "mongodb";


class CourseLectureWatchDurationORMEntity {
	_id: ObjectId;
	courseId: ObjectId;
	lectureId: ObjectId;
	studentId: string;
	duration: number;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: string;
	lastModifiedBy: string;
	isDeleted: boolean;
	version: number;
}

export {
	CourseLectureWatchDurationORMEntity
};