import nconf from "nconf";
import { ErrorCodes, Factory, GenericError } from "../../utils";
import { PaymentObject } from "../domain";
import { PaymentRepositoryImpl } from "../infrastructure";


class PaymentFactory implements Factory {

	private _objects: string[] = [
		"PaymentRepository"
	];

	make(objectName: string): PaymentObject {

		if (objectName === "PaymentRepository")
			return new PaymentRepositoryImpl(nconf.get("STRIPE_API_KEY"));

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
	PaymentFactory
};