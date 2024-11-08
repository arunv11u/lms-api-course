/* eslint-disable max-classes-per-file */
import { CoursePriceCurrencies } from "../../../../course";
import { RemoveCourseFromCartCourseResponseDTO, RemoveCourseFromCartResponseDTO } from "./remove-course-from-cart.response.dto.type";



class RemoveCourseFromCartCourseResponseDTOImpl implements
	RemoveCourseFromCartCourseResponseDTO {
	id: string;
	title: string;
	description: string;
	category: string;
	image: string;
	currency: CoursePriceCurrencies;
	value: number;
	creators: string[] = [];
	totalDuration: number;
	totalLecturesCount: number;
	totalSectionsCount: number;
}

class RemoveCourseFromCartResponseDTOImpl implements
	RemoveCourseFromCartResponseDTO {
	id: string;
	courses: RemoveCourseFromCartCourseResponseDTO[] = [];
	currency: CoursePriceCurrencies;
	totalValue: number;
	tax: number;
}

export {
	RemoveCourseFromCartCourseResponseDTOImpl,
	RemoveCourseFromCartResponseDTOImpl
};