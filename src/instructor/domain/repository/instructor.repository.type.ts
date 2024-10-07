import { Repository } from "../../../utils";
import {
	InstructorCreatedEventValueObject,
	InstructorUpdatedEventValueObject,
	InstructorValueObject
} from "../value-object";


export abstract class InstructorRepository extends Repository {
	abstract get(
		id: string
	): Promise<InstructorValueObject | null>;

	abstract getWithId(id: string): Promise<InstructorValueObject>

	abstract saveInstructorFromMessagingQueue(
		instructorCreatedEventValueObject: InstructorCreatedEventValueObject
	): Promise<void>;

	abstract updateInstructorFromMessagingQueue(
		instructorUpdatedEventValueObject: InstructorUpdatedEventValueObject
	): Promise<void>;

	abstract getInstructorProfileByUserId(
		userId: string
	): Promise<{ id: string }>;
}