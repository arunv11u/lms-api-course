/* eslint-disable max-classes-per-file */
import {
	UploadLectureVideoFieldsResponseDTO,
	UploadLectureVideoResponseDTO
} from "./upload-lecture-video.response.dto.type";


class UploadLectureVideoFieldsResponseDTOImpl implements
	UploadLectureVideoFieldsResponseDTO {
	key: string;
	bucket: string;
	"X-Amz-Algorithm": string;
	"X-Amz-Credential": string;
	"X-Amz-Date": string;
	Policy: string;
	"X-Amz-Signature": string;
}

class UploadLectureVideoResponseDTOImpl implements
	UploadLectureVideoResponseDTO {
	url: string;
	fields = new UploadLectureVideoFieldsResponseDTOImpl();
}

export {
	UploadLectureVideoResponseDTOImpl
};