import { OrderCourseEntity } from "./order-course.entity.type";

enum OrderCurrencies {
	cad = "CAD"
}

abstract class OrderEntity {
	abstract get id(): string;
	abstract set id(id: string);

	abstract get courses(): OrderCourseEntity[];
	abstract set courses(courses: OrderCourseEntity[]);

	abstract get currency(): OrderCurrencies;
	abstract set currency(currency: OrderCurrencies);

	abstract get totalAmount(): number;
	abstract set totalAmount(totalAmount: number);
}


export {
	OrderCurrencies,
	OrderEntity
};