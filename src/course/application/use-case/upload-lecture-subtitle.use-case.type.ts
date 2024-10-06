import { UseCase } from "../../../utils";
import { UploadLectureSubtitleRequestDTO, UploadLectureSubtitleResponseDTO } from "../dto";



export abstract class UploadLectureSubtitleUseCase implements UseCase {
	abstract set uploadLectureSubtitleRequestDTO(
		uploadLectureSubtitleRequestDTO:
			UploadLectureSubtitleRequestDTO
	);

	abstract execute(): Promise<UploadLectureSubtitleResponseDTO>;
}