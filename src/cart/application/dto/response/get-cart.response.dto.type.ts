import { CoursePriceCurrencies } from "../../../../course";


interface GetCartCourseResponseDTO {
	id: string;
	title: string;
	description: string;
	category: string;
	image: string;
	currency: CoursePriceCurrencies;
	value: number;
}

interface GetCartResponseDTO {
	id: string;
	courses: GetCartCourseResponseDTO[];
	currency: CoursePriceCurrencies;
	totalvalue: number;
	tax: number;
}

export {
	GetCartCourseResponseDTO,
	GetCartResponseDTO
};