import { UseCase } from "../../../utils";
import { GetLastViewedCourseRequestDTO, GetLastViewedCourseResponseDTO } from "../dto";


export abstract class GetLastViewedCourseUseCase implements UseCase {
	abstract set getLastViewedCourseRequestDTO(
		getLastViewedCourseRequestDTO: GetLastViewedCourseRequestDTO
	);

	abstract execute(): Promise<GetLastViewedCourseResponseDTO | null>;
}