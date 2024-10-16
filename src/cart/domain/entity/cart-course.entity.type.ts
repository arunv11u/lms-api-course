import { CoursePriceCurrencies } from "../../../course";


abstract class CartCourseEntity {

	abstract get id(): string;
	abstract set id(id: string);

	abstract get title(): string;
	abstract set title(title: string);

	abstract get description(): string;
	abstract set description(description: string);

	abstract get category(): string;
	abstract set category(category: string);

	abstract get image(): string;
	abstract set image(image: string);

	abstract get currency(): CoursePriceCurrencies;
	abstract set currency(currency: CoursePriceCurrencies);

	abstract get value(): number;
	abstract set value(value: number);
}

export {
	CartCourseEntity
};