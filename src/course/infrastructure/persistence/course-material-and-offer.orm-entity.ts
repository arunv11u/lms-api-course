import { ObjectId } from "mongodb";


export class CourseMaterialAndOfferORMEntity {
	_id: ObjectId;
	course: ObjectId;
	materialAndOffer: string;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: ObjectId;
	lastModifiedBy: ObjectId;
	isDeleted: boolean;
	version: number;
}