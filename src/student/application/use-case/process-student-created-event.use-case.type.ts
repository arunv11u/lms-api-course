import { UseCase } from "../../../utils";
import { StudentCreatedEventRequestDTO } from "../dto";


export abstract class ProcessStudentCreatedEventUseCase implements UseCase {
	abstract set studentCreatedEventRequestDTO(
		studentCreatedEventRequestDTO: StudentCreatedEventRequestDTO
	);

	abstract execute(): Promise<void>;
}