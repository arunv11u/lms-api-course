import { CoursePriceCurrencies } from "../../../course";


class AddCourseToCartValueObject {
	id: string;
	title: string;
	description: string;
	category: string;
	image: string;
	currency: CoursePriceCurrencies;
	value: number = 0;
	creators: string[];
	totalDuration: number = 0;
	totalSectionsCount: number = 0;
	totalLecturesCount: number = 0;
}

export {
	AddCourseToCartValueObject
};