import { UseCase } from "../../../utils";
import { ProcessCourseTranscodingCompletedEventRequestDTO } from "../dto";


export abstract class ProcessCourseTranscodingCompletedEventUseCase implements
	UseCase {
	abstract set processCourseTranscodingCompletedEventRequestDTO(
		processCourseTranscodingCompletedEventRequestDTO:
			ProcessCourseTranscodingCompletedEventRequestDTO
	);

	abstract execute(): Promise<void>;
}