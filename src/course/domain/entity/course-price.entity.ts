import { 
	CoursePriceCurrencies, 
	CoursePriceEntity 
} from "./course-price.entity.type";


class CoursePriceEntityImpl implements CoursePriceEntity {

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
	CoursePriceEntityImpl
};