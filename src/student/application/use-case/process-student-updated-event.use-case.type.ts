import { UseCase } from "../../../utils";
import { StudentUpdatedEventRequestDTO } from "../dto";


export abstract class ProcessStudentUpdatedEventUseCase implements UseCase {
	abstract set studentUpdatedEventRequestDTO(
		studentUpdatedEventRequestDTO: StudentUpdatedEventRequestDTO
	);

	abstract execute(): Promise<void>;
}