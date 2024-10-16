/* eslint-disable max-classes-per-file */
import { ObjectId } from "mongodb";


class CartORMEntity {
	_id: ObjectId;
	student: string;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: string;
	lastModifiedBy: string;
	isDeleted: boolean;
	version: number;
}

export {
	CartORMEntity
};