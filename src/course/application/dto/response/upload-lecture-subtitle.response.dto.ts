/* eslint-disable max-classes-per-file */

import {
	UploadLectureSubtitleFieldsResponseDTO,
	UploadLectureSubtitleResponseDTO
} from "./upload-lecture-subtitle.response.dto.type";


class UploadLectureSubtitleFieldsResponseDTOImpl implements
	UploadLectureSubtitleFieldsResponseDTO {
	key: string;
	bucket: string;
	"X-Amz-Algorithm": string;
	"X-Amz-Credential": string;
	"X-Amz-Date": string;
	Policy: string;
	"X-Amz-Signature": string;
}

class UploadLectureSubtitleResponseDTOImpl implements
	UploadLectureSubtitleResponseDTO {
	url: string;
	fields = new UploadLectureSubtitleFieldsResponseDTOImpl();
}

export {
	UploadLectureSubtitleResponseDTOImpl
};