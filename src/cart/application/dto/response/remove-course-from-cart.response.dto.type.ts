import { CoursePriceCurrencies } from "../../../../course";


interface RemoveCourseFromCartCourseResponseDTO {
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

interface RemoveCourseFromCartResponseDTO {
	id: string;
	courses: RemoveCourseFromCartCourseResponseDTO[];
	currency: CoursePriceCurrencies;
	totalValue: number;
	tax: number;
}

export {
	RemoveCourseFromCartCourseResponseDTO,
	RemoveCourseFromCartResponseDTO
};