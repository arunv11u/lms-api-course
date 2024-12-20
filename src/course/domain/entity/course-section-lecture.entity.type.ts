import { CourseSectionLectureSubtitleValueObject } from "../value-objects";
import { CourseSectionLectureSubtitleEntity } from "./course-section-lecture-subtitle.entity.type";
import { CourseSectionLectureStatuses } from "./course.entity.type";


abstract class CourseSectionLectureEntity {
	abstract get id(): string;
	abstract set id(id: string);

	abstract get status(): CourseSectionLectureStatuses;
	abstract set status(status: CourseSectionLectureStatuses);

	abstract get title(): string;
	abstract set title(title: string);

	abstract get description(): string;
	abstract set description(description: string);

	abstract get duration(): number;
	abstract set duration(duration: number);

	abstract get link(): string;
	abstract set link(link: string);

	abstract get thumbnail(): string | null;
	abstract set thumbnail(thumbnail: string | null);

	abstract get subtitles(): CourseSectionLectureSubtitleEntity[];
	abstract addSubtitle(
		subtitle: CourseSectionLectureSubtitleValueObject
	): void;

	abstract get order(): number;
	abstract set order(order: number);

	abstract get watchDuration(): number;
	abstract set watchDuration(watchDuration: number);
}

export {
	CourseSectionLectureEntity
};