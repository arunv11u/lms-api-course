import { UseCase } from "../../../utils";
import { InstructorUpdatedEventRequestDTO } from "../dto";


export abstract class ProcessInstructorUpdatedEventUseCase implements UseCase {
	abstract set instructorUpdatedEventRequestDTO(
		instructorUpdatedEventRequestDTO: InstructorUpdatedEventRequestDTO
	);

	abstract execute(): Promise<void>;
}