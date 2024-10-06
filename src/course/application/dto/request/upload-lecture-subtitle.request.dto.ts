import { UploadLectureSubtitleRequestDTO } from "./upload-lecture-subtitle.request.dto.type";


class UploadLectureSubtitleRequestDTOImpl implements
	UploadLectureSubtitleRequestDTO {
	authorizationToken: string;
	mimeType: string;
}

export {
	UploadLectureSubtitleRequestDTOImpl
};