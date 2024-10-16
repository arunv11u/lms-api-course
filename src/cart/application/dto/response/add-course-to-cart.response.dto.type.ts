import { CoursePriceCurrencies } from "../../../../course";


interface AddCourseToCartCourseResponseDTO {
	id: string;
	title: string;
	description: string;
	category: string;
	image: string;
	currency: CoursePriceCurrencies;
	value: number;
}

interface AddCourseToCartResponseDTO {
	id: string;
	courses: AddCourseToCartCourseResponseDTO[];
	currency: CoursePriceCurrencies;
	totalvalue: number;
	tax: number;
}

export {
	AddCourseToCartCourseResponseDTO,
	AddCourseToCartResponseDTO
};