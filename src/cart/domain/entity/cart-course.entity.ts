import { CoursePriceCurrencies } from "../../../course";
import { CartCourseEntity } from "./cart-course.entity.type";


class CartCourseEntityImpl implements CartCourseEntity {
	private _id: string;
	private _title: string;
	private _description: string;
	private _category: string;
	private _image: string;
	private _currency: CoursePriceCurrencies;
	private _value: number;

	get id(): string {
		return this._id;
	}
	set id(id: string) {
		this._id = id;
	}

	get title(): string {
		return this._title;
	}
	set title(title: string) {
		this._title = title;
	}

	get description(): string {
		return this._description;
	}
	set description(description: string) {
		this._description = description;
	}

	get category(): string {
		return this._category;
	}
	set category(category: string) {
		this._category = category;
	}

	get image(): string {
		return this._image;
	}
	set image(image: string) {
		this._image = image;
	}

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
	CartCourseEntityImpl
};