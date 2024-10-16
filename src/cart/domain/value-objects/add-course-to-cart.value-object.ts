import { CoursePriceCurrencies } from "../../../course";


class AddCourseToCartValueObject {
	id: string;
	title: string;
	description: string;
	category: string;
	image: string;
	currency: CoursePriceCurrencies;
	value: number;
}

export {
	AddCourseToCartValueObject
};