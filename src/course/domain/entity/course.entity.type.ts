import { CoursePriceEntity } from "./course-price.entity.type";
import { CourseRatingEntity } from "./course-rating.entity.type";
import { CourseSectionEntity } from "./course-section.entity.type";

enum CourseLanguages {
	english = "ENGLISH"
}

enum CourseSubtitles {
	english = "ENGLISH",
	french = "FRENCH",
	german = "GERMAN"
}

abstract class CourseEntity {

	abstract get id(): string;
	abstract set id(id: string);

	abstract get title(): string;
	abstract set title(title: string);

	abstract get description(): string;
	abstract set description(description: string);

	abstract get rating(): CourseRatingEntity;
	abstract set rating(rating: CourseRatingEntity);

	abstract get totalStudents(): number;
	abstract set totalStudents(totalStudents: number);

	abstract get creators(): string[];
	abstract set creators(creators: string[]);

	abstract get lastUpdatedOn(): Date;
	abstract set lastUpdatedOn(lastUpdatedOn: Date);

	abstract get languages(): CourseLanguages[];
	abstract set languages(languages: CourseLanguages[]);

	abstract get subtitles(): CourseSubtitles[];
	abstract set subtitles(subtitles: CourseSubtitles[]);

	abstract get learnings(): string[];
	abstract set learnings(learnings: string[]);

	abstract get materialsAndOffers(): string[];
	abstract set materialsAndOffers(materialsAndOffers: string[]);

	abstract get price(): CoursePriceEntity;
	abstract set price(price: CoursePriceEntity);

	abstract get image(): string;
	abstract set image(image: string);

	abstract get sections(): CourseSectionEntity[];
	abstract set sections(sections: CourseSectionEntity[]);

	abstract get totalSectionsCount(): number;
	abstract set totalSectionsCount(totalSectionsCount: number);

	abstract get totalLecturesCount(): number;
	abstract set totalLecturesCount(totalLecturesCount: number);

	abstract get totalDuration(): number;
	abstract set totalDuration(totalDuration: number);
}

export {
	CourseEntity,
	CourseLanguages,
	CourseSubtitles
};