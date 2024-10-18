import { CoursePriceCurrencies } from "../../../course";


abstract class OrderCoursePriceEntity {
	
	abstract get currency(): CoursePriceCurrencies;
	abstract set currency(currency: CoursePriceCurrencies);

	abstract get value(): number;
	abstract set value(value: number);
}

export {
	OrderCoursePriceEntity
};