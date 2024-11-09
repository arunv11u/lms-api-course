import { ObjectId } from "mongodb";
import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { getCartFactory, taxPercentage } from "../../../global-config";
import { ErrorCodes, GenericError } from "../../../utils";
import { CoursePriceCurrencies } from "../../../course";
import { AddCourseToCartValueObject, CartEntity, CartRepository } from "../../domain";
import { CartORMEntity } from "./cart.orm-entity";
import { CartCourseRepositoryImpl } from "./cart-course.repository";



class CartRepositoryImpl implements CartRepository {

	private _collectionName = "carts";
	private _mongodbRepository: MongoDBRepository | null = null;

	set mongoDBRepository(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	getId(): string {
		return new ObjectId().toString();
	}

	async addCourseToCart(
		courseId: string,
		studentId: string
	): Promise<CartEntity> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const cartCourseRepository = new CartCourseRepositoryImpl(
			this._mongodbRepository
		);

		if (await this._isCartExistsForStudent(studentId)) {
			const cartId = await this._getCartIdForStudent(studentId);

			await cartCourseRepository.create(cartId, courseId, studentId);

			const cart = await this._getEntity(cartId);
			if (!cart)
				throw new GenericError({
					code: ErrorCodes.cartNotFound,
					error: new Error("Cart not found"),
					errorCode: 404
				});

			return cart;
		}

		const cartId = new ObjectId();

		const cartORMEntity = new CartORMEntity();
		cartORMEntity._id = cartId;
		cartORMEntity.createdBy = studentId;
		cartORMEntity.creationDate = new Date();
		cartORMEntity.isDeleted = false;
		cartORMEntity.lastModifiedBy = studentId;
		cartORMEntity.lastModifiedDate = new Date();
		cartORMEntity.student = studentId;
		cartORMEntity.version = 1;

		await this._mongodbRepository.add(this._collectionName, cartORMEntity);

		await cartCourseRepository.create(cartId, courseId, studentId);

		const cart = await this._getEntity(cartId);
		if (!cart)
			throw new GenericError({
				code: ErrorCodes.cartNotFound,
				error: new Error("Cart not found"),
				errorCode: 404
			});

		return cart;
	}

	async removeCourseFromCart(
		courseId: string,
		studentId: string
	): Promise<CartEntity | null> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		if (!await this._isCartExistsForStudent(studentId))
			throw new GenericError({
				code: ErrorCodes.cartNotFound,
				error: new Error("Cart not found"),
				errorCode: 404
			});

		const cartId = await this._getCartIdForStudent(studentId);

		const cartCourseRepository =
			new CartCourseRepositoryImpl(this._mongodbRepository);

		await cartCourseRepository.remove(cartId, courseId, studentId);

		if (await cartCourseRepository.isCartEmpty(
			cartId,
			studentId
		)) await this._deleteStudentCart(cartId);

		const cart = await this._getEntity(cartId);

		return cart;
	}

	async clearAllCoursesFromCart(studentId: string): Promise<void> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		if (!await this._isCartExistsForStudent(studentId))
			throw new GenericError({
				code: ErrorCodes.cartNotFound,
				error: new Error("Cart not found"),
				errorCode: 404
			});

		const cartId = await this._getCartIdForStudent(studentId);

		const cartCourseRepository =
			new CartCourseRepositoryImpl(this._mongodbRepository);

		await cartCourseRepository.clearCart(cartId);

		await this._deleteStudentCart(cartId);
	}

	async getCart(studentId: string): Promise<CartEntity | null> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		if (!await this._isCartExistsForStudent(studentId))
			return null;

		const cartId = await this._getCartIdForStudent(studentId);

		const cart = await this._getEntity(cartId);

		return cart;
	}

	private async _deleteStudentCart(cartId: ObjectId): Promise<void> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		await this._mongodbRepository.remove<CartORMEntity>(
			this._collectionName,
			{ _id: cartId }
		);
	}

	private async _isCartExistsForStudent(
		studentId: string
	): Promise<boolean> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const cart = await this._mongodbRepository
			.findOne<CartORMEntity>(
				this._collectionName,
				{ student: studentId }
			);

		if (!cart) return false;

		return true;
	}

	private async _getCartIdForStudent(
		studentId: string
	): Promise<ObjectId> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const cart = await this._mongodbRepository
			.findOne<CartORMEntity>(
				this._collectionName,
				{ student: studentId }
			);

		if (!cart)
			throw new GenericError({
				code: ErrorCodes.cartNotFound,
				error: new Error("Cart not found"),
				errorCode: 404
			});

		return cart._id;
	}

	private async _getEntity(cartId: ObjectId): Promise<CartEntity | null> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const cartCourseRepository = new CartCourseRepositoryImpl(
			this._mongodbRepository
		);

		const cartCourseIds = await cartCourseRepository
			.getAllCartCourseIds(cartId);

		const [cart] = await this._mongodbRepository
			.aggregate(this._collectionName, [
				{ $match: { $expr: { $eq: ["$_id", cartId] } } },
				{
					$lookup: {
						from: "view-courses",
						let: { courseIds: cartCourseIds },
						pipeline: [
							{ $match: { $expr: { $in: ["$_id", "$$courseIds"] } } },
							{
								$project: {
									_id: 1,
									title: 1,
									description: 1,
									category: 1,
									image: 1,
									currency: 1,
									price: 1,
									creators: 1,
									sections: 1,
									lectures: 1
								}
							}
						],
						as: "courses"
					}
				}
			]);

		if (!cart) return null;

		const cartEntity = getCartFactory().make("CartEntity") as CartEntity;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		cart.courses.forEach((course: any) => {

			const addCourseToCartValueObject = new AddCourseToCartValueObject();
			addCourseToCartValueObject.category = course.category;
			addCourseToCartValueObject.currency = course.currency;
			addCourseToCartValueObject.description = course.description;
			addCourseToCartValueObject.id = course._id.toString();
			addCourseToCartValueObject.image = course.image;
			addCourseToCartValueObject.title = course.title;
			addCourseToCartValueObject.value = course.price;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			addCourseToCartValueObject.creators = course.creators.map((creator: any) => `${creator.firstName} ${creator.lastName}`);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			course.sections.forEach((section: any) => {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				section.lectures.forEach((lecture: any) => {
					addCourseToCartValueObject.totalDuration += 
						lecture.duration;

					addCourseToCartValueObject.totalLecturesCount += 1;
				});
			});

			addCourseToCartValueObject.totalSectionsCount = 
				course.sections.length;

			cartEntity.addCourse(addCourseToCartValueObject);
		});

		cartEntity.calculateTotalValue();
		cartEntity.calculateTaxWithPercentage(taxPercentage);
		cartEntity.currency = CoursePriceCurrencies.cad;
		cartEntity.id = cartId.toString();

		return cartEntity;
	}
}

export {
	CartRepositoryImpl
};