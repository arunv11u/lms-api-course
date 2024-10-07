import { CourseSubtitles } from "./course.entity.type";


abstract class CourseSectionLectureSubtitleEntity {
	abstract get language(): CourseSubtitles;
	abstract set language(language: CourseSubtitles);

	abstract get url(): string;
	abstract set url(url: string);
}

export {
	CourseSectionLectureSubtitleEntity
};