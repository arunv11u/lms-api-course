import { CourseSectionLectureStatuses } from "../entity";
import { CourseSectionLectureSubtitleValueObject } from "./course-section-lecture-subtitle.value-object";


class CourseSectionLectureValueObject {
	id: string;
	status: CourseSectionLectureStatuses;
	title: string;
	description: string;
	duration: number;
	link: string;
	thumbnail: string | null = null;
	subtitles: CourseSectionLectureSubtitleValueObject[] = [];
	order: number;
}

export {
	CourseSectionLectureValueObject
};