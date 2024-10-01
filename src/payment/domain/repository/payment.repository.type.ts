import { OrderEntity } from "../../../order";


interface PaymentRepository {
	createCheckoutSession(
		orderEntity: OrderEntity,
		successUrl: string,
		cancelUrl: string
	): Promise<{ sessionId: string }>;
}

export {
	PaymentRepository
};