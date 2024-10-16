import { AddCourseToCartRequestDTO } from "./add-course-to-cart.request.dto.type";


class AddCourseToCartRequestDTOImpl implements AddCourseToCartRequestDTO {
	authorizationToken: string;
	courseId: string;
}

export {
	AddCourseToCartRequestDTOImpl
};