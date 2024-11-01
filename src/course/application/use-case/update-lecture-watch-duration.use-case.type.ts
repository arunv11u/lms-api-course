import { UseCase } from "../../../utils";
import { UpdateLectureWatchDurationRequestDTO, UpdateLectureWatchDurationResponseDTO } from "../dto";


export abstract class UpdateLectureWatchDurationUseCase implements UseCase {
	abstract set updateLectureWatchDurationRequestDTO(
		updateLectureWatchDurationRequestDTO:
			UpdateLectureWatchDurationRequestDTO
	);

	abstract execute(): Promise<UpdateLectureWatchDurationResponseDTO>;
}