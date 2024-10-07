import { ObjectId } from "mongodb";
import { CoursePriceCurrencies, CourseStatuses } from "../../domain";



export class CourseORMEntity {
	_id: ObjectId;
	status: CourseStatuses;
	title: string;
	description: string;
	currency: CoursePriceCurrencies;
	price: number;
	image: string;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: string;
	lastModifiedBy: string;
	isDeleted: boolean;
	version: number;
}