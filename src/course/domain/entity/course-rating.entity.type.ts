

abstract class CourseRatingEntity {

	abstract get value(): number;
	abstract set value(value: number);

	abstract get totalCount(): number;
	abstract set totalCount(totalCount: number);
}

export {
	CourseRatingEntity
};