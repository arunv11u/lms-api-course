import { UseCase } from "../../../utils";
import { UpdateCourseByInstructorRequestDTO, UpdateCourseByInstructorResponseDTO } from "../dto";


export abstract class UpdateCourseByInstructorUseCase implements UseCase {
	abstract set updateCourseByInstructorRequestDTO(
		updateCourseByInstructorRequestDTO: UpdateCourseByInstructorRequestDTO
	);

	abstract execute(): Promise<UpdateCourseByInstructorResponseDTO>;
}