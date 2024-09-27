import { Repository } from "../../../utils";
import { InstructorCreatedEventValueObject } from "../value-object";


export abstract class InstructorRepository extends Repository {
	abstract get(
		id: string
	): Promise<InstructorCreatedEventValueObject | null>;

	abstract saveInstructorFromMessagingQueue(
		instructorCreatedEventValueObject: InstructorCreatedEventValueObject
	): Promise<void>;
}