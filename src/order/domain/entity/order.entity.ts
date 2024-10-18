import { CoursePriceCurrencies } from "../../../course";
import { StudentValueObject } from "../../../student";
import { AddCourseToOrderValueObject } from "../value-object";
import { OrderCourseEntityImpl } from "./order-course.entity";
import { OrderCourseEntity } from "./order-course.entity.type";
import { OrderEntity, OrderStatuses } from "./order.entity.type";


class OrderEntityImpl implements OrderEntity {

	private _id: string;
	private _status: OrderStatuses;
	private _student: StudentValueObject;
	private _courses: OrderCourseEntity[] = [];
	private _currency: CoursePriceCurrencies;
	private _tax: number;
	private _totalAmount: number;

	get id(): string {
		return this._id;
	}
	set id(id: string) {
		this._id = id;
	}

	get status(): OrderStatuses {
		return this._status;
	}
	set status(status: OrderStatuses) {
		this._status = status;
	}

	get student(): StudentValueObject {
		return this._student;
	}
	set student(student: StudentValueObject) {
		this._student = student;
	}

	get courses(): OrderCourseEntity[] {
		return this._courses;
	}
	addCourse(addCourseToOrderValueObject: AddCourseToOrderValueObject): void {
		const orderCourseEntity = new OrderCourseEntityImpl();
		orderCourseEntity.id = addCourseToOrderValueObject.id;
		orderCourseEntity.image = addCourseToOrderValueObject.image;

		orderCourseEntity.setPrice(addCourseToOrderValueObject.price);

		orderCourseEntity.title = addCourseToOrderValueObject.title;

		this._courses.push(orderCourseEntity);
	}

	get currency(): CoursePriceCurrencies {
		return this._currency;
	}
	set currency(currency: CoursePriceCurrencies) {
		this._currency = currency;
	}

	get tax(): number {
		return this._tax;
	}
	set tax(tax: number) {
		this._tax = tax;
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