import Stripe from "stripe";
import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { OrderEntity, OrderRepository } from "../../../order";
import { ErrorCodes, GenericError, Repository } from "../../../utils";
import { PaymentRepository } from "../../domain";
import { StripeCheckoutCompletedRegistryRepositoryImpl } from "./stripe-checkout-completed-registry.repository";
import { getOrderFactory } from "../../../global-config";


class PaymentRepositoryImpl implements PaymentRepository, Repository {

	private _stripe: Stripe;
	private _mongodbRepository: MongoDBRepository | null = null;

	constructor(apiKey: string) {
		this._stripe = new Stripe(apiKey);
	}

	set mongoDBRepository(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async createCheckoutSession(
		orderEntity: OrderEntity,
		successUrl: string,
		cancelUrl: string
	): Promise<{ sessionId: string; }> {
		const lineItems = orderEntity.courses
			.map<Stripe.Checkout.SessionCreateParams.LineItem>(
				(course) => ({
					price_data: {
						currency: course.price.currency,
						product_data: {
							name: course.title,
							images: [course.image]
						},
						unit_amount: course.price.value * 100
					},
					quantity: 1
				})
			);

		const session = await this._stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItems,
			mode: "payment",
			success_url: successUrl,
			cancel_url: cancelUrl,
			metadata: {
				orderId: orderEntity.id
			}
		});

		return { sessionId: session.id };
	}

	async markCheckoutAsCompleted(
		id: string,
		orderId: string,
		version: number
	): Promise<void> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const orderRepository = getOrderFactory().make("OrderRepository") as OrderRepository;
		orderRepository.mongoDBRepository = this._mongodbRepository;

		await orderRepository.markOrderStatusAsCompletedWithId(orderId);

		const stripeCheckoutCompletedRegistryRepository =
			new StripeCheckoutCompletedRegistryRepositoryImpl(
				this._mongodbRepository
			);

		await stripeCheckoutCompletedRegistryRepository
			.create(id, orderId, version);
	}
}

export {
	PaymentRepositoryImpl
};