import { CourseSectionLectureSubtitle } from "./course-section-lecture-subtitle.entity.type";


abstract class CourseSectionLectureEntity {
	abstract get id(): string;
	abstract set id(id: string);

	abstract get title(): string;
	abstract set title(title: string);

	abstract get description(): string;
	abstract set description(description: string);

	abstract get duration(): number;
	abstract set duration(duration: number);

	abstract get link(): string;
	abstract set link(link: string);

	abstract get thumbnail(): string;
	abstract set thumbnail(thumbnail: string);

	abstract get subtitles(): CourseSectionLectureSubtitle[];
	abstract set subtitles(subtitles: CourseSectionLectureSubtitle[]);

	abstract get order(): number;
	abstract set order(order: number);

}

export {
	CourseSectionLectureEntity
};