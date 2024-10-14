import { UseCase } from "../../../utils";
import { ExploreACourseRequestDTO, ExploreACourseResponseDTO } from "../dto";


export abstract class ExploreACourseUseCase implements UseCase {
	abstract set exploreACourseRequestDTO(
		exploreACourseRequestDTO: ExploreACourseRequestDTO
	);

	abstract execute(): Promise<ExploreACourseResponseDTO>;
}