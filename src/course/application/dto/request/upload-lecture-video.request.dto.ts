import { UploadLectureVideoRequestDTO } from "./upload-lecture-video.request.dto.type";


class UploadLectureVideoRequestDTOImpl implements UploadLectureVideoRequestDTO {
	authorizationToken: string;
	mimeType: string;
}

export {
	UploadLectureVideoRequestDTOImpl
};