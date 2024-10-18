import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { ObjectId } from "mongodb";
import { ErrorCodes, GenericError } from "../../../utils";
import { OrderEntity } from "../../domain";
import { OrderCourseORMEntity } from "./order-course.orm-entity";



class OrderCourseRepositoryImpl {

	private _collectionName = "order-courses";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	getId(): string {
		return new ObjectId().toString();
	}

	async createOrderCourses(
		order: OrderEntity
	): Promise<void> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const orderCoursesORMEntity = order.courses
			.map<OrderCourseORMEntity>(course => {
				return {
					_id: new ObjectId(),
					course: new ObjectId(course.id),
					createdBy: order.student.id,
					creationDate: new Date(),
					isDeleted: false,
					lastModifiedBy: order.student.id,
					lastModifiedDate: new Date(),
					order: new ObjectId(order.id),
					student: order.student.id,
					version: 1
				};
			});

		await this._mongodbRepository
			.addRange<OrderCourseORMEntity>(
				this._collectionName,
				orderCoursesORMEntity
			);
	}
}

export {
	OrderCourseRepositoryImpl
};