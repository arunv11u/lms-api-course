import { GetCourseByInstructorRequestDTO } from "./get-course-by-instructor.request.dto.type";



class GetCourseByInstructorRequestDTOImpl implements
	GetCourseByInstructorRequestDTO {
	courseId: string;
	authorizationToken: string;
}

export {
	GetCourseByInstructorRequestDTOImpl
};