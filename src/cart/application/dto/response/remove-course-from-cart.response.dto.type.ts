import { CoursePriceCurrencies } from "../../../../course";


interface RemoveCourseFromCartCourseResponseDTO {
	id: string;
	title: string;
	description: string;
	category: string;
	image: string;
	currency: CoursePriceCurrencies;
	value: number;
}

interface RemoveCourseFromCartResponseDTO {
	id: string;
	courses: RemoveCourseFromCartCourseResponseDTO[];
	currency: CoursePriceCurrencies;
	totalvalue: number;
	tax: number;
}

export {
	RemoveCourseFromCartCourseResponseDTO,
	RemoveCourseFromCartResponseDTO
};