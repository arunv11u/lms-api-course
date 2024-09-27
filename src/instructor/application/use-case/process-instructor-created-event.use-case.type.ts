import { UseCase } from "../../../utils";
import { InstructorCreatedEventRequestDTO } from "../dto";


export abstract class ProcessInstructorCreatedEventUseCase implements UseCase {
	abstract set instructorCreatedEventRequestDTO(
		instructorCreatedEventRequestDTO: InstructorCreatedEventRequestDTO
	);

	abstract execute(): Promise<void>;
}