import { CourseSectionLectureValueObject } from "../value-objects";
import { CourseSectionLectureEntityImpl } from "./course-section-lecture.entity";
import { CourseSectionLectureEntity } from "./course-section-lecture.entity.type";
import { CourseSectionEntity } from "./course-section.entity.type";


class CourseSectionEntityImpl implements CourseSectionEntity {

	private _id: string;
	private _title: string;
	private _lectures: CourseSectionLectureEntity[] = [];
	private _lecturesCount: number;
	private _lecturesDuration: number;
	private _order: number;

	get id(): string {
		return this._id;
	}
	set id(id: string) {
		this._id = id;
	}

	get title(): string {
		return this._title;
	}
	set title(title: string) {
		this._title = title;
	}

	get lectures(): CourseSectionLectureEntity[] {
		return this._lectures;
	}
	addLecture(lecture: CourseSectionLectureValueObject): void {
		const courseSectionLectureEntity = new CourseSectionLectureEntityImpl();

		courseSectionLectureEntity.description = lecture.description;
		courseSectionLectureEntity.duration = lecture.duration;
		courseSectionLectureEntity.id = lecture.id;
		courseSectionLectureEntity.link = lecture.link;
		courseSectionLectureEntity.order = lecture.order;

		lecture.subtitles.forEach(subtitle => {
			courseSectionLectureEntity.addSubtitle(subtitle);
		});

		courseSectionLectureEntity.thumbnail = lecture.thumbnail;
		courseSectionLectureEntity.title = lecture.title;

		this._lectures.push(courseSectionLectureEntity);
	}

	get lecturesCount(): number {
		return this._lecturesCount;
	}
	set lecturesCount(lecturesCount: number) {
		this._lecturesCount = lecturesCount;
	}

	get lecturesDuration(): number {
		return this._lecturesDuration;
	}
	set lecturesDuration(lecturesDuration: number) {
		this._lecturesDuration = lecturesDuration;
	}

	get order(): number {
		return this._order;
	}
	set order(order: number) {
		this._order = order;
	}
}

export {
	CourseSectionEntityImpl
};