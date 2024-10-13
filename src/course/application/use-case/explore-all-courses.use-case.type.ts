import { UseCase } from "../../../utils";
import { ExploreAllCoursesRequestDTO, ExploreAllCoursesResponseDTO } from "../dto";


export abstract class ExploreAllCoursesUseCase implements UseCase {
	abstract set exploreAllCoursesRequestDTO(
		exploreAllCoursesRequestDTO: ExploreAllCoursesRequestDTO
	);

	abstract execute(): Promise<ExploreAllCoursesResponseDTO[]>;
}