
enum OrderCoursePriceCurrencies {
	cad = "CAD"
}

abstract class OrderCoursePriceEntity {
	abstract get id(): string;
	abstract set id(id: string);

	abstract get currency(): OrderCoursePriceCurrencies;
	abstract set currency(currency: OrderCoursePriceCurrencies);

	abstract get value(): number;
	abstract set value(value: number);
}

export {
	OrderCoursePriceCurrencies,
	OrderCoursePriceEntity
};