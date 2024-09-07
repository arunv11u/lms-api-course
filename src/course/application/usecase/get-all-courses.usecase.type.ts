import { Usecase } from "../../../utils";
import { GetAllCoursesResponseDTO } from "../dto";


export abstract class GetAllCoursesUsecase implements Usecase { 
	abstract execute(): Promise<GetAllCoursesResponseDTO>;
}