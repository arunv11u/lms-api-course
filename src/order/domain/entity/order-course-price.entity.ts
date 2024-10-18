import { CoursePriceCurrencies } from "../../../course";
import { OrderCoursePriceEntity } from "./order-course-price.entity.type";


class OrderCoursePriceEntityImpl implements OrderCoursePriceEntity {

	private _currency: CoursePriceCurrencies;
	private _value: number;

	get currency(): CoursePriceCurrencies {
		return this._currency;
	}
	set currency(currency: CoursePriceCurrencies) {
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