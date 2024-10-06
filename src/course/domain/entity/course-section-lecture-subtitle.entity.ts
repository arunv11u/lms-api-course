import { CourseSectionLectureSubtitle } from "./course-section-lecture-subtitle.entity.type";
import { CourseSubtitles } from "./course.entity.type";


class CourseSectionLectureSubtitleImpl implements CourseSectionLectureSubtitle {

	private _language: CourseSubtitles;
	private _url: string;

	get language(): CourseSubtitles {
		return this._language;
	}
	set language(language: CourseSubtitles) {
		this._language = language;
	}

	get url(): string {
		return this._url;
	}
	set url(url: string) {
		this._url = url;
	}
}

export {
	CourseSectionLectureSubtitleImpl
};