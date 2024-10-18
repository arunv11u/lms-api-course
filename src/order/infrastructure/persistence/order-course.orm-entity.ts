import { ObjectId } from "mongodb";


class OrderCourseORMEntity {
	_id: ObjectId;
	order: ObjectId;
	student: string;
	course: ObjectId;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: string;
	lastModifiedBy: string;
	isDeleted: boolean;
	version: number;
}

export {
	OrderCourseORMEntity
};