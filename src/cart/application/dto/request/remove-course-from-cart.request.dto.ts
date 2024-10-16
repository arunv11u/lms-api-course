import { RemoveCourseFromCartRequestDTO } from "./remove-course-from-cart.request.dto.type";


class RemoveCourseFromCartRequestDTOImpl implements
	RemoveCourseFromCartRequestDTO {
	authorizationToken: string;
	courseId: string;
}

export {
	RemoveCourseFromCartRequestDTOImpl
};