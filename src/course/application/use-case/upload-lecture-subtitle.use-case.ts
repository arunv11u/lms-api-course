import { TokenRepository } from "../../../token";
import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { CourseObject, CourseRepository } from "../../domain";
import {
	UploadLectureSubtitleRequestDTO,
	UploadLectureSubtitleResponseDTO,
	UploadLectureSubtitleResponseDTOImpl
} from "../dto";
import { UploadLectureSubtitleUseCase } from "./upload-lecture-subtitle.use-case.type";



export class UploadLectureSubtitleUseCaseImpl implements
	UploadLectureSubtitleUseCase, CourseObject {
	private _unitOfWork: UnitOfWork;
	private _uploadLectureSubtitleRequestDTO:
		UploadLectureSubtitleRequestDTO;
	private _uploadLectureSubtitleResponseDTO:
		UploadLectureSubtitleResponseDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
		this._uploadLectureSubtitleResponseDTO =
			new UploadLectureSubtitleResponseDTOImpl();
	}

	set uploadLectureSubtitleRequestDTO(
		uploadLectureSubtitleRequestDTO:
			UploadLectureSubtitleRequestDTO
	) {
		this._uploadLectureSubtitleRequestDTO =
			uploadLectureSubtitleRequestDTO;
	}

	async execute(): Promise<UploadLectureSubtitleResponseDTO> {
		const tokenRepository = this._unitOfWork
			.getRepository("TokenRepository") as TokenRepository;
		const courseRepository = this._unitOfWork
			.getRepository("CourseRepository") as CourseRepository;

		await tokenRepository
			.validateInstructorAuthorizationToken(
				this._uploadLectureSubtitleRequestDTO.authorizationToken
			);

		const uploadPreSignedURLResponse = await courseRepository
			.uploadLectureSubtitle(
				this._uploadLectureSubtitleRequestDTO.mimeType
			);

		this._uploadLectureSubtitleResponseDTO.url =
			uploadPreSignedURLResponse.url;
		this._uploadLectureSubtitleResponseDTO.fields.Policy =
			uploadPreSignedURLResponse.fields.Policy;
		this._uploadLectureSubtitleResponseDTO.fields["X-Amz-Algorithm"] =
			uploadPreSignedURLResponse.fields["X-Amz-Algorithm"];
		this._uploadLectureSubtitleResponseDTO.fields["X-Amz-Credential"] =
			uploadPreSignedURLResponse.fields["X-Amz-Credential"];
		this._uploadLectureSubtitleResponseDTO.fields["X-Amz-Date"] =
			uploadPreSignedURLResponse.fields["X-Amz-Date"];
		this._uploadLectureSubtitleResponseDTO.fields["X-Amz-Signature"] =
			uploadPreSignedURLResponse.fields["X-Amz-Signature"];
		this._uploadLectureSubtitleResponseDTO.fields.bucket =
			uploadPreSignedURLResponse.fields.bucket;
		this._uploadLectureSubtitleResponseDTO.fields.key =
			uploadPreSignedURLResponse.fields.key;

		return this._uploadLectureSubtitleResponseDTO;
	}
}