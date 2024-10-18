import { ErrorCodes, Factory, GenericError } from "../../utils";
import { OrderEntityImpl, OrderObject } from "../domain";
import { OrderRepositoryImpl } from "../infrastructure";


class OrderFactory implements Factory {

	private _objects: string[] = [
		"OrderEntity",
		"OrderRepository"
	];

	make(objectName: string): OrderObject {

		if (objectName === "OrderEntity")
			return new OrderEntityImpl();

		if (objectName === "OrderRepository")
			return new OrderRepositoryImpl();

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
	OrderFactory
};