import { UseCase } from "../../../utils";
import { ProcessStripeCheckoutCompletedEventRequestDTO } from "../dto";


export abstract class ProcessStripeCheckoutCompletedEventUseCase implements
	UseCase {
	abstract set processStripeCheckoutCompletedEventRequestDTO(
		processStripeCheckoutCompletedEventRequestDTO:
			ProcessStripeCheckoutCompletedEventRequestDTO
	);

	abstract execute(): Promise<void>;
}