import { ClearAllCoursesFromCartRequestDTO } from "./clear-all-courses-from-cart.request.dto.type";


class ClearAllCoursesFromCartRequestDTOImpl implements
	ClearAllCoursesFromCartRequestDTO {
	authorizationToken: string;
}

export {
	ClearAllCoursesFromCartRequestDTOImpl
};