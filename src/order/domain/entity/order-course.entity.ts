import { SetCoursePriceToOrderValueObject } from "../value-object";
import { OrderCoursePriceEntityImpl } from "./order-course-price.entity";
import { OrderCoursePriceEntity } from "./order-course-price.entity.type";
import { OrderCourseEntity } from "./order-course.entity.type";


class OrderCourseEntityImpl implements OrderCourseEntity {

	private _id: string;
	private _image: string;
	private _price: OrderCoursePriceEntity;
	private _title: string;

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
	setPrice(
		setCoursePriceToOrderValueObject: SetCoursePriceToOrderValueObject
	): void {
		const price = new OrderCoursePriceEntityImpl();
		price.currency = setCoursePriceToOrderValueObject.currency;
		price.value = setCoursePriceToOrderValueObject.value;

		this._price = price;
	}

	get title(): string {
		return this._title;
	}
	set title(title: string) {
		this._title = title;
	}
}

export {
	OrderCourseEntityImpl
};