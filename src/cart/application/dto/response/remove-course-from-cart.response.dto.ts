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
}

class RemoveCourseFromCartResponseDTOImpl implements
	RemoveCourseFromCartResponseDTO {
	id: string;
	courses: RemoveCourseFromCartCourseResponseDTO[] = [];
	currency: CoursePriceCurrencies;
	totalvalue: number;
	tax: number;
}

export {
	RemoveCourseFromCartCourseResponseDTOImpl,
	RemoveCourseFromCartResponseDTOImpl
};