
interface UploadLectureVideoFieldsResponseDTO {
	key: string;
	bucket: string;
	"X-Amz-Algorithm": string;
	"X-Amz-Credential": string;
	"X-Amz-Date": string;
	Policy: string;
	"X-Amz-Signature": string;
}


interface UploadLectureVideoResponseDTO {
	url: string;
	fields: UploadLectureVideoFieldsResponseDTO;
}

export {
	UploadLectureVideoFieldsResponseDTO,
	UploadLectureVideoResponseDTO
};