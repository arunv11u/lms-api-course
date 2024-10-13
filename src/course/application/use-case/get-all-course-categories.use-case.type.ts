import { UseCase } from "../../../utils";


export abstract class GetAllCourseCategoriesUseCase implements UseCase {
	abstract execute(): Promise<string[]>;
}