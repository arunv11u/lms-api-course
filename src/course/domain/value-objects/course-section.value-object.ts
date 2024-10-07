import { CourseSectionLectureValueObject } from "./course-section-lecture.value-object";


class CourseSectionValueObject {
	id: string;
	title: string;
	lectures: CourseSectionLectureValueObject[] = [];
	lecturesCount: number;
	lecturesDuration: number;
	order: number;
}


export {
	CourseSectionValueObject
};