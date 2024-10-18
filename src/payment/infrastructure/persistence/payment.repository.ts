import Stripe from "stripe";
import { PaymentRepository } from "../../domain";
import { OrderEntity } from "../../../order";


class PaymentRepositoryImpl implements PaymentRepository {

	private _stripe: Stripe;

	constructor(apiKey: string) {
		this._stripe = new Stripe(apiKey);
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
}

export {
	PaymentRepositoryImpl
};