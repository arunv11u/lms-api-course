/* eslint-disable max-classes-per-file */
import { CoursePriceCurrencies } from "../../../course";


class AddCourseToOrderPriceValueObject {
	currency: CoursePriceCurrencies;
	value: number;
}

class AddCourseToOrderValueObject {
	id: string;
	title: string;
	price = new AddCourseToOrderPriceValueObject();
	image: string;
}

export {
	AddCourseToOrderValueObject
};