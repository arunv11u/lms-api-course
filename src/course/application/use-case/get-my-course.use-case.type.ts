import { UseCase } from "../../../utils";
import { GetMyCourseRequestDTO, GetMyCourseResponseDTO } from "../dto";


export abstract class GetMyCourseUseCase implements UseCase {
	abstract set getMyCourseRequestDTO(
		getMyCourseRequestDTO: GetMyCourseRequestDTO
	);

	abstract execute(): Promise<GetMyCourseResponseDTO>;
}