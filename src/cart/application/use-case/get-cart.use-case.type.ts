import { UseCase } from "../../../utils";
import { GetCartRequestDTO, GetCartResponseDTO } from "../dto";


export abstract class GetCartUseCase implements UseCase {
	abstract set getCartRequestDTO(
		getCartRequestDTO: GetCartRequestDTO
	);

	abstract execute(): Promise<GetCartResponseDTO | null>;
}