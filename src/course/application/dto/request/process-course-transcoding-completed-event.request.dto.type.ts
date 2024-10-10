
interface ProcessCourseTranscodingCompletedEventPayloadRequestDTO {
	lectureId: string;
	duration: number;
	status: string;
	lectureUrl: string;
	thumbnailLectureUrl: string;
}

interface ProcessCourseTranscodingCompletedEventRequestDTO {
	id: string;
	courseId: string;
	payload: ProcessCourseTranscodingCompletedEventPayloadRequestDTO[];
}

export {
	ProcessCourseTranscodingCompletedEventPayloadRequestDTO,
	ProcessCourseTranscodingCompletedEventRequestDTO
};