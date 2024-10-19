import { ProcessStripeCheckoutCompletedEventRequestDTO } from "./process-stripe-checkout-completed-event.request.dto.type";



class ProcessStripeCheckoutCompletedEventRequestDTOImpl implements
	ProcessStripeCheckoutCompletedEventRequestDTO {
	id: string;
	orderId: string;
	version: number;
}

export {
	ProcessStripeCheckoutCompletedEventRequestDTOImpl
};