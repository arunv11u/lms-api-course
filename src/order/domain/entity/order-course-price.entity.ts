import { OrderCoursePriceCurrencies, OrderCoursePriceEntity } from "./order-course-price.entity.type";


abstract class OrderCoursePriceEntityImpl implements OrderCoursePriceEntity {

	private _id: string;
	private _currency: OrderCoursePriceCurrencies;
	private _value: number;

	get id(): string {
		return this._id;
	}
	set id(id: string) {
		this._id = id;
	}

	get currency(): OrderCoursePriceCurrencies {
		return this._currency;
	}
	set currency(currency: OrderCoursePriceCurrencies) {
		this._currency = currency;
	}

	get value(): number {
		return this._value;
	}
	set value(value: number) {
		this._value = value;
	}
}

export {
	OrderCoursePriceEntityImpl
};