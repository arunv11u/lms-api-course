/* eslint-disable max-classes-per-file */
import {
	UploadCourseImageResponseDTO,
	UploadCourseImageFieldsResponseDTO
} from "./upload-course-image.response.dto.type";

class UploadCourseImageFieldsResponseDTOImpl implements
	UploadCourseImageFieldsResponseDTO {
	key: string;
	bucket: string;
	"X-Amz-Algorithm": string;
	"X-Amz-Credential": string;
	"X-Amz-Date": string;
	Policy: string;
	"X-Amz-Signature": string;
}

class UploadCourseImageResponseDTOImpl implements UploadCourseImageResponseDTO {
	url: string;
	fields = new UploadCourseImageFieldsResponseDTOImpl();
}

export {
	UploadCourseImageResponseDTOImpl
};