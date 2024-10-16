import { UseCase } from "../../../utils";
import { AddCourseToCartRequestDTO, AddCourseToCartResponseDTO } from "../dto";

export abstract class AddCourseToCartUseCase implements UseCase {
	abstract set addCourseToCartRequestDTO(
		addCourseToCartRequestDTO: AddCourseToCartRequestDTO
	);

	abstract execute(): Promise<AddCourseToCartResponseDTO>;
}