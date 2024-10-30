import { GetMyCourseRequestDTO } from "./get-my-course.request.dto.type";


class GetMyCourseRequestDTOImpl implements GetMyCourseRequestDTO {
	authorizationToken: string;
	courseId: string;
}

export {
	GetMyCourseRequestDTOImpl
};