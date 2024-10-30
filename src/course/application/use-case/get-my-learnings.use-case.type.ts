import { UseCase } from "../../../utils";
import { GetMyLearningsRequestDTO, GetMyLearningsResponseDTO } from "../dto";


export abstract class GetMyLearningsUseCase implements UseCase {
	abstract set getMyLearningsRequestDTO(
		getMyLearningsRequestDTO: GetMyLearningsRequestDTO
	);

	abstract execute(): Promise<GetMyLearningsResponseDTO[]>;
}