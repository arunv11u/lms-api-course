import { CourseRatingEntity } from "./course-rating.entity.type";



class CourseRatingEntityImpl implements CourseRatingEntity {

	private _value: number;
	private _totalCount: number;

	get value(): number {
		return this._value;
	}
	set value(value: number) {
		this._value = value;
	}

	get totalCount(): number {
		return this._totalCount;
	}
	set totalCount(totalCount: number) {
		this._totalCount = totalCount;
	}
}

export {
	CourseRatingEntityImpl
};