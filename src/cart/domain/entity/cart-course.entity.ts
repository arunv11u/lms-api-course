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
	private _creators: string[] = [];
	private _totalDuration: number;
	private _totalLecturesCount: number;
	private _totalSectionsCount: number;

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

	get creators(): string[] {
		return this._creators;
	}
	set creators(creators: string[]) {
		this._creators = creators;
	}

	get totalDuration(): number {
		return this._totalDuration;
	}
	set totalDuration(totalDuration: number) {
		this._totalDuration = totalDuration;
	}

	get totalLecturesCount(): number {
		return this._totalLecturesCount;
	}
	set totalLecturesCount(totalLecturesCount: number) {
		this._totalLecturesCount = totalLecturesCount;
	}

	get totalSectionsCount(): number {
		return this._totalSectionsCount;
	}
	set totalSectionsCount(totalSectionsCount: number) {
		this._totalSectionsCount = totalSectionsCount;
	}
}

export {
	CartCourseEntityImpl
};