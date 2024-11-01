import { UpdateLectureWatchDurationRequestDTO } from "./update-lecture-watch-duration.request.dto.type";


class UpdateLectureWatchDurationRequestDTOImpl implements
	UpdateLectureWatchDurationRequestDTO {
	courseId: string;
	duration: number;
	lectureId: string;
	studentId: string;
}

export {
	UpdateLectureWatchDurationRequestDTOImpl
};