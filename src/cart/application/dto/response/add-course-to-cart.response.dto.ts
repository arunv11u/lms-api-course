/* eslint-disable max-classes-per-file */
import { CoursePriceCurrencies } from "../../../../course";
import { AddCourseToCartCourseResponseDTO, AddCourseToCartResponseDTO } from "./add-course-to-cart.response.dto.type";



class AddCourseToCartCourseResponseDTOImpl implements
	AddCourseToCartCourseResponseDTO {
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

class AddCourseToCartResponseDTOImpl implements
	AddCourseToCartResponseDTO {
	id: string;
	courses: AddCourseToCartCourseResponseDTO[] = [];
	currency: CoursePriceCurrencies;
	totalValue: number;
	tax: number;
}

export {
	AddCourseToCartCourseResponseDTOImpl,
	AddCourseToCartResponseDTOImpl
};