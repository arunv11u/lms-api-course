import { UseCase } from "../../../utils";
import { RemoveCourseFromCartRequestDTO, RemoveCourseFromCartResponseDTO } from "../dto";


export abstract class RemoveCourseFromCartUseCase implements UseCase {
	abstract set removeCourseFromCartRequestDTO(
		removeCourseFromCartRequestDTO: RemoveCourseFromCartRequestDTO
	);

	abstract execute(): Promise<RemoveCourseFromCartResponseDTO>;
}