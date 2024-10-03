import { UseCase } from "../../../utils";
import { UploadCourseImageRequestDTO, UploadCourseImageResponseDTO } from "../dto";



export abstract class UploadCourseImageUseCase implements UseCase {
	abstract set uploadCourseImageRequestDTO(
		uploadCourseImageRequestDTO:
			UploadCourseImageRequestDTO
	);

	abstract execute(): Promise<UploadCourseImageResponseDTO>;
}