import { UseCase } from "../../../utils";
import { CheckoutCartRequestDTO, CheckoutCartResponseDTO } from "../dto";



export abstract class CheckoutCartUseCase implements UseCase {
	abstract set checkoutCartRequestDTO(
		checkoutCartRequestDTO: CheckoutCartRequestDTO
	);

	abstract execute(): Promise<CheckoutCartResponseDTO>;
}