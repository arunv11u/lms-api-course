import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { PaymentObject, PaymentRepository } from "../../domain";
import { ProcessStripeCheckoutCompletedEventRequestDTO } from "../dto";
import { ProcessStripeCheckoutCompletedEventUseCase } from "./process-stripe-checkout-completed-event.use-case.type";



export class ProcessStripeCheckoutCompletedEventUseCaseImpl implements
	ProcessStripeCheckoutCompletedEventUseCase, PaymentObject {
	private _unitOfWork: UnitOfWork;
	private _processStripeCheckoutCompletedEventRequestDTO:
		ProcessStripeCheckoutCompletedEventRequestDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
	}

	set processStripeCheckoutCompletedEventRequestDTO(
		processStripeCheckoutCompletedEventRequestDTO:
			ProcessStripeCheckoutCompletedEventRequestDTO
	) {
		this._processStripeCheckoutCompletedEventRequestDTO =
			processStripeCheckoutCompletedEventRequestDTO;
	}

	async execute(): Promise<void> {
		try {
			await this._unitOfWork.start();

			const paymentRepository = this._unitOfWork
				.getRepository("PaymentRepository") as PaymentRepository;

			await paymentRepository.markCheckoutAsCompleted(
				this._processStripeCheckoutCompletedEventRequestDTO.id,
				this._processStripeCheckoutCompletedEventRequestDTO.orderId,
				this._processStripeCheckoutCompletedEventRequestDTO.version
			);

			await this._unitOfWork.complete();
		} catch (error) {
			await this._unitOfWork.dispose();

			throw error;
		}
	}
}