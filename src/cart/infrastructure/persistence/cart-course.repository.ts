import { ObjectId } from "mongodb";
import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { ErrorCodes, GenericError } from "../../../utils";
import { CartCourseORMEntity } from "./cart-course.orm-entity";



class CartCourseRepositoryImpl {

	private _collectionName = "cart-courses";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async create(
		cartId: ObjectId,
		courseId: string,
		studentId: string
	): Promise<void> {
		if(await this._isCartCourseExistsForStudent(
			cartId,
			courseId,
			studentId
		)) throw new GenericError({
			code: ErrorCodes.cartCourseAlreadyExists,
			error: new Error("Course already exists in the cart"),
			errorCode: 403
		});

		const cartCourseORMEntity = new CartCourseORMEntity();
		cartCourseORMEntity._id = new ObjectId();
		cartCourseORMEntity.cart = cartId;
		cartCourseORMEntity.course = new ObjectId(courseId);
		cartCourseORMEntity.createdBy = studentId;
		cartCourseORMEntity.creationDate = new Date();
		cartCourseORMEntity.isDeleted = false;
		cartCourseORMEntity.lastModifiedBy = studentId;
		cartCourseORMEntity.lastModifiedDate = new Date();
		cartCourseORMEntity.student = studentId;
		cartCourseORMEntity.version = 1;

		await this._mongodbRepository
			.add(this._collectionName, cartCourseORMEntity);
	}

	async getAllCartCourseIds(cartId: ObjectId): Promise<ObjectId[]> {
		const cartCourses = await this._mongodbRepository
			.find<CartCourseORMEntity>(this._collectionName, { cart: cartId });

		const cartCourseIds = cartCourses.map(cartCourse => cartCourse.course);

		return cartCourseIds;
	}

	private async _isCartCourseExistsForStudent(
		cartId: ObjectId,
		courseId: string,
		studentId: string
	): Promise<boolean> {
		const cartCourse = await this._mongodbRepository
			.findOne<CartCourseORMEntity>(
				this._collectionName,
				{
					cart: cartId,
					course: new ObjectId(courseId),
					student: studentId
				}
			);

		if (!cartCourse) return false;

		return true;
	}
}

export {
	CartCourseRepositoryImpl
};