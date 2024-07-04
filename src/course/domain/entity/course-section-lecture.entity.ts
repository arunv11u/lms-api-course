import { CourseSectionLectureEntity } from "./course-section-lecture.entity.type";



class CourseSectionLectureEntityImpl implements CourseSectionLectureEntity {

	private _id: string;
	private _title: string;
	private _description: string;
	private _duration: number;
	private _link: string;
	private _thumbnail: string;

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

	get description(): string {
		return this._description;
	}
	set description(description: string) {
		this._description = description;
	}

	get duration(): number {
		return this._duration;
	}
	set duration(duration: number) {
		this._duration = duration;
	}

	get link(): string {
		return this._link;
	}
	set link(link: string) {
		this._link = link;
	}

	get thumbnail(): string {
		return this._thumbnail;
	}
	set thumbnail(thumbnail: string) {
		this._thumbnail = thumbnail;
	}
}

export {
	CourseSectionLectureEntityImpl
};