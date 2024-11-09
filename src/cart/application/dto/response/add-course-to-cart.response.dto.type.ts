import { CoursePriceCurrencies } from "../../../../course";


interface AddCourseToCartCourseResponseDTO {
	id: string;
	title: string;
	description: string;
	category: string;
	image: string;
	currency: CoursePriceCurrencies;
	value: number;
	creators: string[];
	totalDuration: number;
	totalSectionsCount: number;
	totalLecturesCount: number;
}

interface AddCourseToCartResponseDTO {
	id: string;
	courses: AddCourseToCartCourseResponseDTO[];
	currency: CoursePriceCurrencies;
	totalValue: number;
	tax: number;
}

export {
	AddCourseToCartCourseResponseDTO,
	AddCourseToCartResponseDTO
};