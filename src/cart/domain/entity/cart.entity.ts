import { CoursePriceCurrencies } from "../../../course";
import { AddCourseToCartValueObject } from "../value-objects";
import { CartCourseEntityImpl } from "./cart-course.entity";
import { CartCourseEntity } from "./cart-course.entity.type";
import { CartEntity } from "./cart.entity.type";



class CartEntityImpl implements CartEntity {
	private _id: string;
	private _courses: CartCourseEntity[] = [];
	private _currency: CoursePriceCurrencies;
	private _totalvalue: number = 0;
	private _tax: number = 0;

	get id(): string {
		return this._id;
	}
	set id(id: string) {
		this._id = id;
	}

	get courses(): CartCourseEntity[] {
		return this._courses;
	}
	addCourse(addCourseToCartValueObject: AddCourseToCartValueObject): void {
		const cartCourseEntity = new CartCourseEntityImpl();
		cartCourseEntity.category = addCourseToCartValueObject.category;
		cartCourseEntity.currency = addCourseToCartValueObject.currency;
		cartCourseEntity.description = addCourseToCartValueObject.description;
		cartCourseEntity.id = addCourseToCartValueObject.id;
		cartCourseEntity.image = addCourseToCartValueObject.image;
		cartCourseEntity.title = addCourseToCartValueObject.title;
		cartCourseEntity.value = addCourseToCartValueObject.value;

		this._courses.push(cartCourseEntity);
	}

	get currency(): CoursePriceCurrencies {
		return this._currency;
	}
	set currency(currency: CoursePriceCurrencies) {
		this._currency = currency;
	}

	get totalvalue(): number {
		return this._totalvalue;
	}
	calculateTotalValue(): void {
		const totalValue = this._courses.reduce(
			(accumulator: number, currentValue: CartCourseEntity) =>
				(accumulator + currentValue.value), 0);

		this._totalvalue = totalValue;
	}

	get tax(): number {
		return this._tax;
	}
	calculateTaxWithPercentage(percentage: number): void {
		const taxValue = this._totalvalue * (percentage / 100);

		this._tax = taxValue;
	}
}

export {
	CartEntityImpl
};