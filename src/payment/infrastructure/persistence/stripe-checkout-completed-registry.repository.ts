import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { StripeCheckoutCompletedRegistryORMEntity } from "./stripe-checkout-completed-registry.orm-entity";


export class StripeCheckoutCompletedRegistryRepositoryImpl {
	private _collectionName = "stripe-checkout-completed-registry";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async hasCheckoutCompletedWithId(id: string): Promise<boolean> {
		const isCompleted = await this._mongodbRepository
			.findOne<StripeCheckoutCompletedRegistryORMEntity>(
				this._collectionName,
				{ _id: id }
			);

		if (isCompleted) return true;

		return false;
	}

	async create(
		id: string,
		orderId: string,
		version: number
	): Promise<void> {

		const stripeCheckoutCompletedRegistryORMEntity =
			new StripeCheckoutCompletedRegistryORMEntity();
		stripeCheckoutCompletedRegistryORMEntity._id = id;
		stripeCheckoutCompletedRegistryORMEntity.creationDate = new Date();
		stripeCheckoutCompletedRegistryORMEntity.orderId = orderId;
		stripeCheckoutCompletedRegistryORMEntity.version = version;

		await this._mongodbRepository
			.add<StripeCheckoutCompletedRegistryORMEntity>(
				this._collectionName,
				stripeCheckoutCompletedRegistryORMEntity
			);
	}
}