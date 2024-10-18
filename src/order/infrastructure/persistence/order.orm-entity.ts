import { ObjectId } from "mongodb";
import { OrderStatuses } from "../../domain";


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

export {
	OrderORMEntity
};