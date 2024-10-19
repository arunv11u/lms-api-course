import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { OrderEntity, OrderRepository, OrderStatuses } from "../../domain";
import { ObjectId } from "mongodb";
import { ErrorCodes, GenericError } from "../../../utils";
import { OrderORMEntity } from "./order.orm-entity";
import { OrderCourseRepositoryImpl } from "./order-course.repository";




class OrderRepositoryImpl implements OrderRepository {

	private _collectionName = "orders";
	private _mongodbRepository: MongoDBRepository | null = null;

	set mongoDBRepository(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	getId(): string {
		return new ObjectId().toString();
	}

	async placeAnOrder(
		order: OrderEntity
	): Promise<OrderEntity> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const orderCourseRepository =
			new OrderCourseRepositoryImpl(this._mongodbRepository);

		const orderORMEntity = new OrderORMEntity();
		orderORMEntity._id = new ObjectId(order.id);
		orderORMEntity.createdBy = order.student.id;
		orderORMEntity.creationDate = new Date();
		orderORMEntity.isDeleted = false;
		orderORMEntity.lastModifiedBy = order.student.id;
		orderORMEntity.lastModifiedDate = new Date();
		orderORMEntity.status = OrderStatuses.pending;
		orderORMEntity.student = order.student.id;
		orderORMEntity.version = 1;

		await this._mongodbRepository.add<OrderORMEntity>(
			this._collectionName,
			orderORMEntity
		);

		await orderCourseRepository
			.createOrderCourses(order);

		return order;
	}

	async markOrderStatusAsCompletedWithId(orderId: string): Promise<void> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		await this._mongodbRepository.update<OrderORMEntity>(
			this._collectionName,
			{
				_id: new ObjectId(orderId)
			},
			{
				status: OrderStatuses.completed
			}
		);
	}
}

export {
	OrderRepositoryImpl
};