import { CourseCreatorValueObject, CourseSectionLectureValueObject, CourseSectionValueObject } from "../value-objects";
import { CourseCreatorEntityImpl } from "./course-creator.entity";
import { CourseCreatorEntity } from "./course-creator.entity.type";
import { CoursePriceEntityImpl } from "./course-price.entity";
import { CoursePriceCurrencies, CoursePriceEntity } from "./course-price.entity.type";
import { CourseRatingEntityImpl } from "./course-rating.entity";
import { CourseRatingEntity } from "./course-rating.entity.type";
import { CourseSectionLectureEntityImpl } from "./course-section-lecture.entity";
import { CourseSectionLectureEntity } from "./course-section-lecture.entity.type";
import { CourseSectionEntityImpl } from "./course-section.entity";
import { CourseSectionEntity } from "./course-section.entity.type";
import {
	CourseEntity,
	CourseLanguages,
	CourseStatuses,
	CourseSubtitles
} from "./course.entity.type";



class CourseEntityImpl implements CourseEntity {

	private _id: string;
	private _status: CourseStatuses;
	private _title: string;
	private _description: string;
	private _category: string;
	private _rating: CourseRatingEntity | null = null;
	private _totalStudents: number;
	private _creators: CourseCreatorEntity[] = [];
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
	private _lastViewedLecture: CourseSectionLectureEntity | null = null;
	private _isStudentEnrolledForCourse: boolean = false;

	get id(): string {
		return this._id;
	}
	set id(id: string) {
		this._id = id;
	}

	get status(): CourseStatuses {
		return this._status;
	}
	set status(status: CourseStatuses) {
		this._status = status;
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

	get category(): string {
		return this._category;
	}
	set category(category: string) {
		this._category = category;
	}

	get rating(): CourseRatingEntity | null {
		return this._rating;
	}
	setRating(value: number, totalCount: number): void {
		const courseRatingEntity = new CourseRatingEntityImpl();
		courseRatingEntity.totalCount = totalCount;
		courseRatingEntity.value = value;

		this._rating = courseRatingEntity;
	}

	get totalStudents(): number {
		return this._totalStudents;
	}
	set totalStudents(totalStudents: number) {
		this._totalStudents = totalStudents;
	}

	get creators(): CourseCreatorEntity[] {
		return this._creators;
	}
	addCreator(creator: CourseCreatorValueObject): void {
		const courseCreatorEntity = new CourseCreatorEntityImpl();
		courseCreatorEntity.designation = creator.designation;
		courseCreatorEntity.firstName = creator.firstName;
		courseCreatorEntity.id = creator.id;
		courseCreatorEntity.lastName = creator.lastName;
		courseCreatorEntity.profilePicture = creator.profilePicture;

		this._creators.push(courseCreatorEntity);
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
	addLanguage(language: CourseLanguages): void {
		this._languages.push(language);
	}

	get subtitles(): CourseSubtitles[] {
		return this._subtitles;
	}
	addSubtitle(subtitle: CourseSubtitles): void {
		this._subtitles.push(subtitle);
	}

	get learnings(): string[] {
		return this._learnings;
	}
	addLearning(learning: string): void {
		this._learnings.push(learning);
	}

	get materialsAndOffers(): string[] {
		return this._materialsAndOffers;
	}
	addMaterialAndOffer(materialAndOffer: string): void {
		this._materialsAndOffers.push(materialAndOffer);
	}

	get price(): CoursePriceEntity {
		return this._price;
	}
	setPrice(currency: CoursePriceCurrencies, value: number): void {
		const coursePriceEntity = new CoursePriceEntityImpl();
		coursePriceEntity.currency = currency;
		coursePriceEntity.value = value;

		this._price = coursePriceEntity;
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
	addSection(section: CourseSectionValueObject): void {
		const courseSectionEntity = new CourseSectionEntityImpl();

		section.lectures.forEach(lecture => {
			courseSectionEntity.addLecture(lecture);
		});

		courseSectionEntity.id = section.id;
		courseSectionEntity.lecturesCount = section.lecturesCount;
		courseSectionEntity.lecturesDuration = section.lecturesDuration;
		courseSectionEntity.order = section.order;
		courseSectionEntity.title = section.title;

		this._sections.push(courseSectionEntity);
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

	get lastViewedLecture(): CourseSectionLectureEntity | null {
		return this._lastViewedLecture;
	}
	setLastViewedLecture(
		lecture: CourseSectionLectureValueObject
	): void {
		const courseSectionLectureEntity = new CourseSectionLectureEntityImpl();

		courseSectionLectureEntity.description = lecture.description;
		courseSectionLectureEntity.duration = lecture.duration;
		courseSectionLectureEntity.id = lecture.id;
		courseSectionLectureEntity.link = lecture.link;
		courseSectionLectureEntity.order = lecture.order;

		lecture.subtitles.forEach(subtitle => {
			courseSectionLectureEntity.addSubtitle(subtitle);
		});

		courseSectionLectureEntity.thumbnail = lecture.thumbnail;
		courseSectionLectureEntity.title = lecture.title;

		this._lastViewedLecture = courseSectionLectureEntity;
	}

	get isStudentEnrolledForCourse(): boolean {
		return this._isStudentEnrolledForCourse;
	}
	set isStudentEnrolledForCourse(isStudentEnrolledForCourse: boolean) {
		this._isStudentEnrolledForCourse = isStudentEnrolledForCourse;
	}
}

export {
	CourseEntityImpl
};