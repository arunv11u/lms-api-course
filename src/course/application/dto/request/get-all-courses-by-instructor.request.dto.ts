import { GetAllCoursesByInstructorRequestDTO } from "./get-all-courses-by-instructor.request.dto.type";



class GetAllCoursesByInstructorRequestDTOImpl implements
	GetAllCoursesByInstructorRequestDTO {
	authorizationToken: string;
}

export {
	GetAllCoursesByInstructorRequestDTOImpl
};