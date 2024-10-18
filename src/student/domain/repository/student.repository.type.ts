import { Repository } from "../../../utils";
import { StudentCreatedEventValueObject, StudentUpdatedEventValueObject, StudentValueObject } from "../value-object";


export abstract class StudentRepository extends Repository {
	abstract get(
		id: string
	): Promise<StudentValueObject | null>;

	abstract saveStudentFromMessagingQueue(
		studentCreatedEventValueObject: StudentCreatedEventValueObject
	): Promise<void>;

	abstract updateStudentFromMessagingQueue(
		studentUpdatedEventValueObject: StudentUpdatedEventValueObject
	): Promise<void>;

	abstract getStudentProfileByUserId(
		userId: string
	): Promise<{ id: string }>;
}