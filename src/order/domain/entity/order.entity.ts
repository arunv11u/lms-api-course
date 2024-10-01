import { OrderCourseEntity } from "./order-course.entity.type";
import { OrderCurrencies, OrderEntity } from "./order.entity.type";


class OrderEntityImpl implements OrderEntity {

	private _id: string;
	private _courses: OrderCourseEntity[] = [];
	private _currency: OrderCurrencies;
	private _totalAmount: number;

	get id(): string {
		return this._id;
	}
	set id(id: string) {
		this._id = id;
	}

	get courses(): OrderCourseEntity[] {
		return this._courses;
	}
	set courses(courses: OrderCourseEntity[]) {
		this._courses = courses;
	}

	get currency(): OrderCurrencies {
		return this._currency;
	}
	set currency(currency: OrderCurrencies) {
		this._currency = currency;
	}

	get totalAmount(): number {
		return this._totalAmount;
	}
	set totalAmount(totalAmount: number) {
		this._totalAmount = totalAmount;
	}
}

export {
	OrderEntityImpl
};