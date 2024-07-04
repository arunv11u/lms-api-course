import { ObjectId } from "mongodb";
import { CoursePriceCurrencies } from "../../domain";



export class CourseORMEntity {
	_id: ObjectId;
	title: string;
	description: string;
	lastUpdatedOn: Date;
	currency: CoursePriceCurrencies;
	price: number;
	image: string;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: ObjectId;
	lastModifiedBy: ObjectId;
	isDeleted: boolean;
	version: number;
}