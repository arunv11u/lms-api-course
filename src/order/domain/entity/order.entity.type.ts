import { CoursePriceCurrencies } from "../../../course";
import { StudentValueObject } from "../../../student";
import { AddCourseToOrderValueObject } from "../value-object";
import { OrderCourseEntity } from "./order-course.entity.type";


enum OrderStatuses {
	pending = "PENDING",
	completed = "COMPLETED"
}

abstract class OrderEntity {
	abstract get id(): string;
	abstract set id(id: string);

	abstract get status(): OrderStatuses;
	abstract set status(status: OrderStatuses);

	abstract get student(): StudentValueObject;
	abstract set student(student: StudentValueObject);

	abstract get courses(): OrderCourseEntity[];
	abstract addCourse(
		addCourseToOrderValueObject: AddCourseToOrderValueObject
	): void;

	abstract get currency(): CoursePriceCurrencies;
	abstract set currency(currency: CoursePriceCurrencies);

	abstract get tax(): number;
	abstract set tax(tax: number);

	abstract get totalAmount(): number;
	abstract set totalAmount(totalAmount: number);
}


export {
	OrderStatuses,
	OrderEntity
};