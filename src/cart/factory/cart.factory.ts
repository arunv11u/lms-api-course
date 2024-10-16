import { ErrorCodes, Factory, GenericError } from "../../utils";
import { 
	AddCourseToCartUseCaseImpl, 
	ClearAllCoursesFromCartUseCaseImpl, 
	RemoveCourseFromCartUseCaseImpl 
} from "../application";
import { CartEntityImpl, CartObject } from "../domain";
import { CartRepositoryImpl } from "../infrastructure";


class CartFactory implements Factory {

	private _objects: string[] = [
		"CartEntity",
		"CartRepository",
		"AddCourseToCartUseCase",
		"RemoveCourseFromCartUseCase",
		"ClearAllCoursesFromCartUseCase"
	];

	make(objectName: string): CartObject {

		if (objectName === "CartEntity")
			return new CartEntityImpl();

		if (objectName === "CartRepository")
			return new CartRepositoryImpl();

		if (objectName === "AddCourseToCartUseCase")
			return new AddCourseToCartUseCaseImpl();

		if (objectName === "RemoveCourseFromCartUseCase")
			return new RemoveCourseFromCartUseCaseImpl();

		if (objectName === "ClearAllCoursesFromCartUseCase")
			return new ClearAllCoursesFromCartUseCaseImpl();

		throw new GenericError({
			code: ErrorCodes.invalidFactoryObject,
			error: new Error("Requested object is invalid"),
			errorCode: 500
		});
	}

	getAll(): string[] {
		return this._objects;
	}
}

export {
	CartFactory
};