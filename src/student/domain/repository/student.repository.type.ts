import { Repository } from "../../../utils";
import { StudentCreatedEventValueObject, StudentUpdatedEventValueObject } from "../value-object";


export abstract class StudentRepository extends Repository {
	abstract get(
		id: string
	): Promise<StudentCreatedEventValueObject | null>;

	abstract saveStudentFromMessagingQueue(
		studentCreatedEventValueObject: StudentCreatedEventValueObject
	): Promise<void>;

	abstract updateStudentFromMessagingQueue(
		studentUpdatedEventValueObject: StudentUpdatedEventValueObject
	): Promise<void>;
}