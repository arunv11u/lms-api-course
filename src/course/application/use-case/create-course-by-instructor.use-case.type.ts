import { UseCase } from "../../../utils";
import { CreateCourseByInstructorRequestDTO, CreateCourseByInstructorResponseDTO } from "../dto";


export abstract class CreateCourseByInstructorUseCase implements UseCase {
	abstract set createCourseByInstructorRequestDTO(
		createCourseByInstructorRequestDTO: CreateCourseByInstructorRequestDTO
	);

	abstract execute(): Promise<CreateCourseByInstructorResponseDTO>;
}