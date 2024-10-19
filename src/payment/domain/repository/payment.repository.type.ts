import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { OrderEntity } from "../../../order";


abstract class PaymentRepository {
	abstract set mongoDBRepository(mongoDBRepository: MongoDBRepository);

	abstract createCheckoutSession(
		orderEntity: OrderEntity,
		successUrl: string,
		cancelUrl: string
	): Promise<{ sessionId: string }>;

	abstract markCheckoutAsCompleted(
		id: string,
		orderId: string,
		version: number
	): Promise<void>;
}

export {
	PaymentRepository
};