import { ObjectId } from "mongodb";
import { OrderStatuses } from "../../domain";
import { CoursePriceCurrencies } from "../../../course";


class OrderORMEntity {
	_id: ObjectId;
	status: OrderStatuses;
	student: string;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: string;
	lastModifiedBy: string;
	isDeleted: boolean;
	version: number;
}

interface ViewOrderStudentORMEntity {
	_id: ObjectId;
	profilePicture: string | null;
	email: string;
	firstName: string;
	lastName: string;
	userId: string;
	version: number;
}

interface ViewOrderCourseORMEntity {
	_id: ObjectId;
	category: string;
	currency: CoursePriceCurrencies;
	title: string;
	description: string;
	image: string;
	price: number;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: string;
	lastModifiedBy: string;
	isDeleted: boolean;
	version: number;
}

interface ViewOrderORMEntity {
	_id: ObjectId;
	status: OrderStatuses;
	student: ViewOrderStudentORMEntity;
	courses: ViewOrderCourseORMEntity[];
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: string;
	lastModifiedBy: string;
	isDeleted: boolean;
	version: number;
}

export {
	OrderORMEntity,
	ViewOrderORMEntity
};