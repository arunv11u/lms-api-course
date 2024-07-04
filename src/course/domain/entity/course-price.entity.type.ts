
enum CoursePriceCurrencies {
	cad = "CAD"
}

abstract class CoursePriceEntity {

	abstract get currency(): CoursePriceCurrencies;
	abstract set currency(currency: CoursePriceCurrencies);

	abstract get value(): number;
	abstract set value(value: number);
}

export {
	CoursePriceEntity,
	CoursePriceCurrencies
};