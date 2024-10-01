import { OrderCoursePriceEntity } from "./order-course-price.entity.type";
import { OrderCourseEntity } from "./order-course.entity.type";


class OrderCourseEntityImpl implements OrderCourseEntity {

	private _id: string;
	private _image: string;
	private _price: OrderCoursePriceEntity;
	private _title: string;
	private _quantity: number;

	get id(): string {
		return this._id;
	}
	set id(id: string) {
		this._id = id;
	}

	get image(): string {
		return this._image;
	}
	set image(image: string) {
		this._image = image;
	}

	get price(): OrderCoursePriceEntity {
		return this._price;
	}
	set price(price: OrderCoursePriceEntity) {
		this._price = price;
	}

	get title(): string {
		return this._title;
	}
	set title(title: string) {
		this._title = title;
	}

	get quantity(): number {
		return this._quantity;
	}
	set quantity(quantity: number) {
		this._quantity = quantity;
	}
}

export {
	OrderCourseEntityImpl
};