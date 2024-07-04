import { CoursePriceEntity } from "./course-price.entity.type";
import { CourseRatingEntity } from "./course-rating.entity.type";
import { CourseSectionEntity } from "./course-section.entity.type";
import { 
	CourseEntity, 
	CourseLanguages, 
	CourseSubtitles 
} from "./course.entity.type";



class CourseEntityImpl implements CourseEntity {

	private _id: string;
	private _title: string;
	private _description: string;
	private _rating: CourseRatingEntity;
	private _totalStudents: number;
	private _creators: string[] = [];
	private _lastUpdatedOn: Date;
	private _languages: CourseLanguages[] = [];
	private _subtitles: CourseSubtitles[] = [];
	private _learnings: string[] = [];
	private _materialsAndOffers: string[] = [];
	private _price: CoursePriceEntity;
	private _image: string;
	private _sections: CourseSectionEntity[] = [];
	private _totalSectionsCount: number;
	private _totalLecturesCount: number;
	private _totalDuration: number;

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

	get rating(): CourseRatingEntity {
		return this._rating;
	}
	set rating(rating: CourseRatingEntity) {
		this._rating = rating;
	}

	get totalStudents(): number {
		return this._totalStudents;
	}
	set totalStudents(totalStudents: number) {
		this._totalStudents = totalStudents;
	}

	get creators(): string[] {
		return this._creators;
	}
	set creators(creators: string[]) {
		this._creators = creators;
	}

	get lastUpdatedOn(): Date {
		return this._lastUpdatedOn;
	}
	set lastUpdatedOn(lastUpdatedOn: Date) {
		this._lastUpdatedOn = lastUpdatedOn;
	}

	get languages(): CourseLanguages[] {
		return this._languages;
	}
	set languages(languages: CourseLanguages[]) {
		this._languages = languages;
	}

	get subtitles(): CourseSubtitles[] {
		return this._subtitles;
	}
	set subtitles(subtitles: CourseSubtitles[]) {
		this._subtitles = subtitles;
	}

	get learnings(): string[] {
		return this._learnings;
	}
	set learnings(learnings: string[]) {
		this._learnings = learnings;
	}

	get materialsAndOffers(): string[] {
		return this._materialsAndOffers;
	}
	set materialsAndOffers(materialsAndOffers: string[]) {
		this._materialsAndOffers = materialsAndOffers;
	}

	get price(): CoursePriceEntity {
		return this._price;
	}
	set price(price: CoursePriceEntity) {
		this._price = price;
	}

	get image(): string {
		return this._image;
	}
	set image(image: string) {
		this._image = image;
	}

	get sections(): CourseSectionEntity[] {
		return this._sections;
	}
	set sections(sections: CourseSectionEntity[]) {
		this._sections = sections;
	}

	get totalSectionsCount(): number {
		return this._totalSectionsCount;
	}
	set totalSectionsCount(totalSectionsCount: number) {
		this._totalSectionsCount = totalSectionsCount;
	}

	get totalLecturesCount(): number {
		return this._totalLecturesCount;
	}
	set totalLecturesCount(totalLecturesCount: number) {
		this._totalLecturesCount = totalLecturesCount;
	}

	get totalDuration(): number {
		return this._totalDuration;
	}
	set totalDuration(totalDuration: number) {
		this._totalDuration = totalDuration;
	}
}

export {
	CourseEntityImpl
};