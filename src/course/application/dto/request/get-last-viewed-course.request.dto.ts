import { GetLastViewedCourseRequestDTO } from "./get-last-viewed-course.request.dto.type";



class GetLastViewedCourseRequestDTOImpl implements
	GetLastViewedCourseRequestDTO {
	authorizationToken: string;
}

export {
	GetLastViewedCourseRequestDTOImpl
};