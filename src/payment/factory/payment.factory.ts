import nconf from "nconf";
import { ErrorCodes, Factory, GenericError } from "../../utils";
import { PaymentObject } from "../domain";
import { PaymentRepositoryImpl } from "../infrastructure";
import { ProcessStripeCheckoutCompletedEventUseCaseImpl } from "../application";


class PaymentFactory implements Factory {

	private _objects: string[] = [
		"PaymentRepository",
		"ProcessStripeCheckoutCompletedEventUseCase"
	];

	make(objectName: string): PaymentObject {

		if (objectName === "PaymentRepository")
			return new PaymentRepositoryImpl(nconf.get("STRIPE_API_KEY"));

		if (objectName === "ProcessStripeCheckoutCompletedEventUseCase")
			return new ProcessStripeCheckoutCompletedEventUseCaseImpl();

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