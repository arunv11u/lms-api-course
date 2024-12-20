/* eslint-disable max-classes-per-file */
import { CoursePriceCurrencies } from "../../../../course";
import { GetCartCourseResponseDTO, GetCartResponseDTO } from "./get-cart.response.dto.type";



class GetCartCourseResponseDTOImpl implements
	GetCartCourseResponseDTO {
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

class GetCartResponseDTOImpl implements
	GetCartResponseDTO {
	id: string;
	courses: GetCartCourseResponseDTO[] = [];
	currency: CoursePriceCurrencies;
	totalValue: number;
	tax: number;
}

export {
	GetCartCourseResponseDTOImpl,
	GetCartResponseDTOImpl
};