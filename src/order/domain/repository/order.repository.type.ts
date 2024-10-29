import { Repository } from "../../../utils";
import { OrderEntity } from "../entity";



export abstract class OrderRepository extends Repository {
	abstract getId(): string;

	abstract placeAnOrder(
		order: OrderEntity
	): Promise<OrderEntity>;

	abstract markOrderStatusAsCompletedWithId(
		orderId: string
	): Promise<void>;

	abstract getOrder(
		id: string
	): Promise<OrderEntity>;
}