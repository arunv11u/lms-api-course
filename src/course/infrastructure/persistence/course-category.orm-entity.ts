import { ObjectId } from "mongodb";


interface CourseCategoryORMEntity {
	_id: ObjectId;
	category: string;
	creationDate: Date;
	lastModifiedDate: Date;
	isDeleted: boolean;
	version: number;
}

export {
	CourseCategoryORMEntity
};