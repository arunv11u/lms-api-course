import { UseCase } from "../../../utils";
import { GetAllCoursesByInstructorRequestDTO, GetAllCoursesByInstructorResponseDTO } from "../dto";


export abstract class GetAllCoursesByInstructorUseCase implements UseCase {
	abstract set getAllCoursesByInstructorRequestDTO(
		getAllCoursesByInstructorRequestDTO: GetAllCoursesByInstructorRequestDTO
	);

	abstract execute(): Promise<GetAllCoursesByInstructorResponseDTO[]>;
}