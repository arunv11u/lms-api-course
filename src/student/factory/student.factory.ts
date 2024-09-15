import { ErrorCodes, Factory, GenericError } from "../../utils";
import { ProcessStudentCreatedEventUseCaseImpl } from "../application/use-case/process-student-created-event.use-case";
import { StudentObject } from "../domain";
import { StudentRepositoryImpl } from "../infrastructure";


class StudentFactory implements Factory {

	private _objects: string[] = [
		"StudentRepository",
		"ProcessStudentCreatedEventUseCase"
	];

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	make(objectName: string): StudentObject {

		if (objectName === "StudentRepository")
			return new StudentRepositoryImpl();

		if (objectName === "ProcessStudentCreatedEventUseCase")
			return new ProcessStudentCreatedEventUseCaseImpl();

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
	StudentFactory
};