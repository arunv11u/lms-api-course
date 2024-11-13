import { ExploreACourseRequestDTO } from "./explore-a-course.request.dto.type";


export class ExploreACourseRequestDTOImpl implements
	ExploreACourseRequestDTO {
	courseId: string;
	authorizationToken: string | null = null;
}