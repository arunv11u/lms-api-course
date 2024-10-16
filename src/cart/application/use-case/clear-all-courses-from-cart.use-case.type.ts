import { UseCase } from "../../../utils";
import { ClearAllCoursesFromCartRequestDTO } from "../dto";


export abstract class ClearAllCoursesFromCartUseCase implements UseCase {
	abstract set clearAllCoursesFromCartRequestDTO(
		clearAllCoursesFromCartRequestDTO: ClearAllCoursesFromCartRequestDTO
	);

	abstract execute(): Promise<void>;
}