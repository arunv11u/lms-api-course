import { SetCoursePriceToOrderValueObject } from "../value-object";
import { OrderCoursePriceEntity } from "./order-course-price.entity.type";


abstract class OrderCourseEntity {
	abstract get id(): string;
	abstract set id(id: string);

	abstract get title(): string;
	abstract set title(title: string);

	abstract get price(): OrderCoursePriceEntity;
	abstract setPrice(
		setCoursePriceToOrderValueObject: SetCoursePriceToOrderValueObject
	): void;

	abstract get image(): string;
	abstract set image(image: string);
}

export {
	OrderCourseEntity
};