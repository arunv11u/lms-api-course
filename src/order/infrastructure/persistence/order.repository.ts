import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { ObjectId } from "mongodb";
import { ErrorCodes, GenericError } from "../../../utils";
import { getOrderFactory, taxPercentage } from "../../../global-config";
import { AddCourseToOrderValueObject, OrderEntity, OrderRepository, OrderStatuses } from "../../domain";
import { OrderORMEntity, ViewOrderORMEntity } from "./order.orm-entity";
import { OrderCourseRepositoryImpl } from "./order-course.repository";
import { CoursePriceCurrencies } from "../../../course";
import { StudentValueObject } from "../../../student";




class OrderRepositoryImpl implements OrderRepository {

	private _collectionName = "orders";
	private _viewCollectionName = "view-orders";
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

	async getOrder(id: string): Promise<OrderEntity> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const viewOrderORMEntity = await this._mongodbRepository
			.get<ViewOrderORMEntity>(
				this._viewCollectionName,
				new ObjectId(id)
			);
		if (!viewOrderORMEntity)
			throw new GenericError({
				code: ErrorCodes.orderNotFound,
				error: new Error("Order not found"),
				errorCode: 404
			});

		const orderEntity = getOrderFactory().make("OrderEntity") as OrderEntity;

		viewOrderORMEntity.courses.forEach(course => {
			const addCourseToOrderValueObject =
				new AddCourseToOrderValueObject();
			addCourseToOrderValueObject.id = course._id.toString();
			addCourseToOrderValueObject.image = course.image;
			addCourseToOrderValueObject.price.currency = course.currency;
			addCourseToOrderValueObject.price.value = course.price;
			addCourseToOrderValueObject.title = course.title;

			orderEntity.addCourse(addCourseToOrderValueObject);
		});

		orderEntity.currency = CoursePriceCurrencies.cad;
		orderEntity.id = viewOrderORMEntity._id.toString();
		orderEntity.status = viewOrderORMEntity.status;

		const studentValueObject = new StudentValueObject();
		studentValueObject.email = viewOrderORMEntity.student.email;
		studentValueObject.firstName = viewOrderORMEntity.student.firstName;
		studentValueObject.id = viewOrderORMEntity.student._id.toString();
		studentValueObject.lastName = viewOrderORMEntity.student.lastName;
		studentValueObject.profilePicture =
			viewOrderORMEntity.student.profilePicture;
		studentValueObject.userId = viewOrderORMEntity.student.userId;
		studentValueObject.version = viewOrderORMEntity.student.version;
		orderEntity.student = studentValueObject;


		const totalAmount = viewOrderORMEntity.courses
			.reduce<number>(
				(accumulator, course) => accumulator + course.price,
				0
			);
		orderEntity.totalAmount = totalAmount;

		orderEntity.tax = totalAmount * (taxPercentage / 100);

		return orderEntity;
	}
}

export {
	OrderRepositoryImpl
};