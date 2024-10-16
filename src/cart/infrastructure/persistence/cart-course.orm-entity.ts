/* eslint-disable max-classes-per-file */
import { ObjectId } from "mongodb";


class CartCourseORMEntity {
	_id: ObjectId;
	cart: ObjectId;
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
	CartCourseORMEntity
};