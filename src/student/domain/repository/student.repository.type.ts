import { Repository } from "../../../utils";
import { StudentCreatedEventValueObject } from "../value-object";


export abstract class StudentRepository extends Repository {
	abstract get(
		id: string
	): Promise<StudentCreatedEventValueObject | null>;

	abstract saveStudentFromMessagingQueue(
		studentCreatedEventData: StudentCreatedEventValueObject
	): Promise<void>;
}