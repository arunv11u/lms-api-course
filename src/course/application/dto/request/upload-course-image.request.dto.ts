import { UploadCourseImageRequestDTO } from "./upload-course-image.request.dto.type";


class UploadCourseImageRequestDTOImpl implements UploadCourseImageRequestDTO {
	authorizationToken: string;
	mimeType: string;
}

export {
	UploadCourseImageRequestDTOImpl
};