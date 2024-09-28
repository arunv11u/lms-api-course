import { Repository } from "../../../utils";
import { 
	InstructorCreatedEventValueObject, 
	InstructorUpdatedEventValueObject 
} from "../value-object";


export abstract class InstructorRepository extends Repository {
	abstract get(
		id: string
	): Promise<InstructorCreatedEventValueObject | null>;

	abstract saveInstructorFromMessagingQueue(
		instructorCreatedEventValueObject: InstructorCreatedEventValueObject
	): Promise<void>;

	abstract updateInstructorFromMessagingQueue(
		instructorUpdatedEventValueObject: InstructorUpdatedEventValueObject
	): Promise<void>;
}