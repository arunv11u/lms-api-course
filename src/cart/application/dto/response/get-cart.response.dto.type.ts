import { CoursePriceCurrencies } from "../../../../course";


interface GetCartCourseResponseDTO {
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

interface GetCartResponseDTO {
	id: string;
	courses: GetCartCourseResponseDTO[];
	currency: CoursePriceCurrencies;
	totalValue: number;
	tax: number;
}

export {
	GetCartCourseResponseDTO,
	GetCartResponseDTO
};