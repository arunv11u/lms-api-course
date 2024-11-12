import { CourseCreatorValueObject, CourseSectionLectureValueObject, CourseSectionValueObject } from "../value-objects";
import { CourseCreatorEntity } from "./course-creator.entity.type";
import { CoursePriceEntity } from "./course-price.entity.type";
import { CourseRatingEntity } from "./course-rating.entity.type";
import { CourseSectionLectureEntity } from "./course-section-lecture.entity.type";
import { CourseSectionEntity } from "./course-section.entity.type";

enum CourseLanguages {
	english = "English"
}

enum CourseSubtitles {
	english = "English",
	french = "French",
	germany = "Germany"
}

enum CoursePriceCurrencies {
	cad = "CAD"
}

enum CourseStatuses {
	transcodingInProgress = "TRANSCODING_IN_PROGRESS",
	transcodingCompleted = "TRANSCODING_COMPLETED"
}

enum CourseSectionLectureStatuses {
	transcodingInProgress = "TRANSCODING_IN_PROGRESS",
	transcodingCompleted = "TRANSCODING_COMPLETED"
}

abstract class CourseEntity {

	abstract get id(): string;
	abstract set id(id: string);

	abstract get status(): CourseStatuses;
	abstract set status(status: CourseStatuses);

	abstract get title(): string;
	abstract set title(title: string);

	abstract get description(): string;
	abstract set description(description: string);

	abstract get category(): string;
	abstract set category(category: string);

	abstract get rating(): CourseRatingEntity | null;
	abstract setRating(value: number, totalCount: number): void;

	abstract get totalStudents(): number;
	abstract set totalStudents(totalStudents: number);

	abstract get creators(): CourseCreatorEntity[];
	abstract addCreator(creator: CourseCreatorValueObject): void;

	abstract get lastUpdatedOn(): Date;
	abstract set lastUpdatedOn(lastUpdatedOn: Date);

	abstract get languages(): CourseLanguages[];
	abstract addLanguage(language: CourseLanguages): void;

	abstract get subtitles(): CourseSubtitles[];
	abstract addSubtitle(subtitle: CourseSubtitles): void;

	abstract get learnings(): string[];
	abstract addLearning(learning: string): void;

	abstract get materialsAndOffers(): string[];
	abstract addMaterialAndOffer(materialAndOffer: string): void;

	abstract get price(): CoursePriceEntity;
	abstract setPrice(currency: CoursePriceCurrencies, value: number): void;

	abstract get image(): string;
	abstract set image(image: string);

	abstract get sections(): CourseSectionEntity[];
	abstract addSection(section: CourseSectionValueObject): void;

	abstract get totalSectionsCount(): number;
	abstract set totalSectionsCount(totalSectionsCount: number);

	abstract get totalLecturesCount(): number;
	abstract set totalLecturesCount(totalLecturesCount: number);

	abstract get totalDuration(): number;
	abstract set totalDuration(totalDuration: number);

	abstract get lastViewedLecture(): CourseSectionLectureEntity | null;
	abstract setLastViewedLecture(
		lecture: CourseSectionLectureValueObject
	): void;

	abstract get isStudentEnrolledForCourse(): boolean;
	abstract set isStudentEnrolledForCourse(
		isStudentEnrolledForCourse: boolean
	);
}

export {
	CourseEntity,
	CourseLanguages,
	CourseSubtitles,
	CoursePriceCurrencies,
	CourseStatuses,
	CourseSectionLectureStatuses
};