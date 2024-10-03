import { TokenRepository } from "../../../token";
import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { CourseObject, CourseRepository } from "../../domain";
import {
	UploadLectureVideoRequestDTO,
	UploadLectureVideoResponseDTO,
	UploadLectureVideoResponseDTOImpl
} from "../dto";
import { UploadLectureVideoUseCase } from "./upload-lecture-video.use-case.type";



export class UploadLectureVideoUseCaseImpl implements
	UploadLectureVideoUseCase, CourseObject {
	private _unitOfWork: UnitOfWork;
	private _uploadLectureVideoRequestDTO:
		UploadLectureVideoRequestDTO;
	private _uploadLectureVideoResponseDTO:
		UploadLectureVideoResponseDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
		this._uploadLectureVideoResponseDTO =
			new UploadLectureVideoResponseDTOImpl();
	}

	set uploadLectureVideoRequestDTO(
		uploadLectureVideoRequestDTO:
			UploadLectureVideoRequestDTO
	) {
		this._uploadLectureVideoRequestDTO =
			uploadLectureVideoRequestDTO;
	}

	async execute(): Promise<UploadLectureVideoResponseDTO> {
		const tokenRepository = this._unitOfWork
			.getRepository("TokenRepository") as TokenRepository;
		const courseRepository = this._unitOfWork
			.getRepository("CourseRepository") as CourseRepository;

		await tokenRepository
			.validateInstructorAuthorizationToken(
				this._uploadLectureVideoRequestDTO.authorizationToken
			);

		const uploadPreSignedURLResponse = await courseRepository
			.uploadLectureVideo(
				this._uploadLectureVideoRequestDTO.mimeType
			);

		this._uploadLectureVideoResponseDTO.url =
			uploadPreSignedURLResponse.url;
		this._uploadLectureVideoResponseDTO.fields.Policy =
			uploadPreSignedURLResponse.fields.Policy;
		this._uploadLectureVideoResponseDTO.fields["X-Amz-Algorithm"] =
			uploadPreSignedURLResponse.fields["X-Amz-Algorithm"];
		this._uploadLectureVideoResponseDTO.fields["X-Amz-Credential"] =
			uploadPreSignedURLResponse.fields["X-Amz-Credential"];
		this._uploadLectureVideoResponseDTO.fields["X-Amz-Date"] =
			uploadPreSignedURLResponse.fields["X-Amz-Date"];
		this._uploadLectureVideoResponseDTO.fields["X-Amz-Signature"] =
			uploadPreSignedURLResponse.fields["X-Amz-Signature"];
		this._uploadLectureVideoResponseDTO.fields.bucket =
			uploadPreSignedURLResponse.fields.bucket;
		this._uploadLectureVideoResponseDTO.fields.key =
			uploadPreSignedURLResponse.fields.key;

		return this._uploadLectureVideoResponseDTO;
	}
}