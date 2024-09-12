import { UseCase } from "../../../utils";
import { GetAllCoursesResponseDTO } from "../dto";


export abstract class GetAllCoursesUseCase implements UseCase { 
	abstract execute(): Promise<GetAllCoursesResponseDTO>;
}