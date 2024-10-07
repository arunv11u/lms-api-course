import { CourseSectionLectureValueObject } from "../value-objects";
import { CourseSectionLectureEntity } from "./course-section-lecture.entity.type";


abstract class CourseSectionEntity {
	abstract get id(): string;
	abstract set id(id: string);

	abstract get title(): string;
	abstract set title(title: string);

	abstract get lectures(): CourseSectionLectureEntity[];
	abstract addLecture(lecture: CourseSectionLectureValueObject): void;

	abstract get lecturesCount(): number;
	abstract set lecturesCount(lecturesCount: number);

	abstract get lecturesDuration(): number;
	abstract set lecturesDuration(lecturesDuration: number);

	abstract get order(): number;
	abstract set order(order: number);
}

export {
	CourseSectionEntity
};