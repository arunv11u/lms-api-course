import { CourseEntity } from "../../course";


abstract class TranscoderRepository {
	abstract transcodeVideoLectures(
		courseEntity: CourseEntity
	): Promise<void>;

	abstract transcodeVideoLecturesIfUpdated(
		courseEntity: CourseEntity
	): Promise<void>;
}

export {
	TranscoderRepository
};