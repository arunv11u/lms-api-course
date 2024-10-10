/* eslint-disable max-classes-per-file */
import {
	ProcessCourseTranscodingCompletedEventPayloadRequestDTO,
	ProcessCourseTranscodingCompletedEventRequestDTO
} from "./process-course-transcoding-completed-event.request.dto.type";


class ProcessCourseTranscodingCompletedEventPayloadRequestDTOImpl implements
	ProcessCourseTranscodingCompletedEventPayloadRequestDTO {
	duration: number;
	lectureId: string;
	lectureUrl: string;
	status: string;
	thumbnailLectureUrl: string;
}

class ProcessCourseTranscodingCompletedEventRequestDTOImpl implements
	ProcessCourseTranscodingCompletedEventRequestDTO {
	id: string;
	courseId: string;
	payload: ProcessCourseTranscodingCompletedEventPayloadRequestDTO[] = [];
}

export {
	ProcessCourseTranscodingCompletedEventPayloadRequestDTOImpl,
	ProcessCourseTranscodingCompletedEventRequestDTOImpl
};