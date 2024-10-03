import { UseCase } from "../../../utils";
import {
	UploadLectureVideoRequestDTO,
	UploadLectureVideoResponseDTO
} from "../dto";



export abstract class UploadLectureVideoUseCase implements UseCase {
	abstract set uploadLectureVideoRequestDTO(
		uploadLectureVideoRequestDTO:
			UploadLectureVideoRequestDTO
	);

	abstract execute(): Promise<UploadLectureVideoResponseDTO>;
}