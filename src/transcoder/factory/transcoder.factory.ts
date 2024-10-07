import { ErrorCodes, Factory, GenericError } from "../../utils";
import { TranscoderObject } from "../domain";
import { TranscoderRepositoryImpl } from "../infrastructure";


class TranscoderFactory implements Factory {

	private _objects: string[] = [
		"TranscoderRepository"
	];

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	make(objectName: string): TranscoderObject {

		if (objectName === "TranscoderRepository")
			return new TranscoderRepositoryImpl();

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
	TranscoderFactory
};