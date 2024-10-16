import { CoursePriceCurrencies } from "../../../course";
import { AddCourseToCartValueObject } from "../value-objects";
import { CartCourseEntity } from "./cart-course.entity.type";


abstract class CartEntity {

	abstract get id(): string;
	abstract set id(id: string);

	abstract get courses(): CartCourseEntity[];
	abstract addCourse(
		addCourseToCartValueObject: AddCourseToCartValueObject
	): void;

	abstract get currency(): CoursePriceCurrencies;
	abstract set currency(currency: CoursePriceCurrencies);

	abstract get totalvalue(): number;
	abstract calculateTotalValue(): void;

	abstract get tax(): number;
	abstract calculateTaxWithPercentage(percentage: number): void;
}

export {
	CartEntity
};