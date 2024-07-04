import { Usecase } from "../../../utils";
import { GetAllCoursesResponseDTO } from "../../presentation";


export abstract class GetAllCoursesUsecase implements Usecase { 
	abstract execute(): Promise<GetAllCoursesResponseDTO>;
}