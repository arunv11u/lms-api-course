import { OrderCoursePriceEntity } from "./order-course-price.entity.type";


abstract class OrderCourseEntity {
	abstract get id(): string;
	abstract set id(id: string);

	abstract get title(): string;
	abstract set title(title: string);

	abstract get price(): OrderCoursePriceEntity;
	abstract set price(price: OrderCoursePriceEntity);

	abstract get image(): string;
	abstract set image(image: string);

	abstract get quantity(): number;
	abstract set quantity(quantity: number);
}

export {
	OrderCourseEntity
};