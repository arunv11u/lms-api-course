

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
}

export {
	CourseSectionLectureEntity
};