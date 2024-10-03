import { TokenRepository } from "../../../token";
import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { CourseObject, CourseRepository } from "../../domain";
import { 
	UploadCourseImageRequestDTO, 
	UploadCourseImageResponseDTO, 
	UploadCourseImageResponseDTOImpl 
} from "../dto";
import { UploadCourseImageUseCase } from "./upload-course-image.use-case.type";



export class UploadCourseImageUseCaseImpl implements
	UploadCourseImageUseCase, CourseObject {
	private _unitOfWork: UnitOfWork;
	private _uploadCourseImageRequestDTO:
		UploadCourseImageRequestDTO;
	private _uploadCourseImageResponseDTO:
		UploadCourseImageResponseDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
		this._uploadCourseImageResponseDTO =
			new UploadCourseImageResponseDTOImpl();
	}

	set uploadCourseImageRequestDTO(
		uploadCourseImageRequestDTO:
			UploadCourseImageRequestDTO
	) {
		this._uploadCourseImageRequestDTO =
			uploadCourseImageRequestDTO;
	}

	async execute(): Promise<UploadCourseImageResponseDTO> {
		const tokenRepository = this._unitOfWork
			.getRepository("TokenRepository") as TokenRepository;
		const courseRepository = this._unitOfWork
			.getRepository("CourseRepository") as CourseRepository;

		await tokenRepository
			.validateInstructorAuthorizationToken(
				this._uploadCourseImageRequestDTO.authorizationToken
			);

		const uploadPreSignedURLResponse = await courseRepository
			.uploadCourseImage(
				this._uploadCourseImageRequestDTO.mimeType
			);

		this._uploadCourseImageResponseDTO.url =
			uploadPreSignedURLResponse.url;
		this._uploadCourseImageResponseDTO.fields.Policy =
			uploadPreSignedURLResponse.fields.Policy;
		this._uploadCourseImageResponseDTO.fields["X-Amz-Algorithm"] =
			uploadPreSignedURLResponse.fields["X-Amz-Algorithm"];
		this._uploadCourseImageResponseDTO.fields["X-Amz-Credential"] =
			uploadPreSignedURLResponse.fields["X-Amz-Credential"];
		this._uploadCourseImageResponseDTO.fields["X-Amz-Date"] =
			uploadPreSignedURLResponse.fields["X-Amz-Date"];
		this._uploadCourseImageResponseDTO.fields["X-Amz-Signature"] =
			uploadPreSignedURLResponse.fields["X-Amz-Signature"];
		this._uploadCourseImageResponseDTO.fields.bucket =
			uploadPreSignedURLResponse.fields.bucket;
		this._uploadCourseImageResponseDTO.fields.key =
			uploadPreSignedURLResponse.fields.key;

		return this._uploadCourseImageResponseDTO;
	}
}