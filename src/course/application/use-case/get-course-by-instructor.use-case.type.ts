import { UseCase } from "../../../utils";
import { GetCourseByInstructorRequestDTO, GetCourseByInstructorResponseDTO } from "../dto";


export abstract class GetCourseByInstructorUseCase implements UseCase {
	abstract set getCourseByInstructorRequestDTO(
		getCourseByInstructorRequestDTO: GetCourseByInstructorRequestDTO
	);

	abstract execute(): Promise<GetCourseByInstructorResponseDTO>;
}