/* eslint-disable max-classes-per-file */
import { ObjectId } from "mongodb";
import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseSectionLectureStatuses,
	CourseStatuses,
	CourseSubtitles
} from "../../domain";



class CourseORMEntity {
	_id: ObjectId;
	title: string;
	description: string;
	category: string;
	currency: CoursePriceCurrencies;
	price: number;
	image: string;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: string;
	lastModifiedBy: string;
	isDeleted: boolean;
	version: number;
}

interface ViewCourseSectionLectureORMEntity {
	_id: ObjectId;
	status: CourseSectionLectureStatuses;
	course: ObjectId;
	section: ObjectId;
	title: string;
	description: string;
	duration: number;
	link: string;
	thumbnail: string | null;
	order: number;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: string;
	lastModifiedBy: string;
	isDeleted: boolean;
	version: number;
}

interface ViewCourseSectionORMEntity {
	_id: ObjectId;
	course: ObjectId;
	title: string;
	order: number;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: string;
	lastModifiedBy: string;
	isDeleted: boolean;
	version: number;
	lectures: ViewCourseSectionLectureORMEntity[];
}

interface ViewCourseLanguageORMEntity {
	_id: ObjectId;
	course: ObjectId;
	language: CourseLanguages;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: string;
	lastModifiedBy: string;
	isDeleted: boolean;
	version: number;
}

interface ViewCourseLearningORMEntity {
	_id: ObjectId;
	course: ObjectId;
	learning: string;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: string;
	lastModifiedBy: string;
	isDeleted: boolean;
	version: number;
}

interface ViewCourseMaterialAndOfferORMEntity {
	_id: ObjectId;
	course: ObjectId;
	materialAndOffer: string;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: string;
	lastModifiedBy: string;
	isDeleted: boolean;
	version: number;
}

interface ViewCourseSubtitleORMEntity {
	_id: ObjectId;
	course: ObjectId;
	subtitle: CourseSubtitles;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: string;
	lastModifiedBy: string;
	isDeleted: boolean;
	version: number;
}

interface ViewCourseCreatorORMEntity {
	_id: string;
	firstName: string;
	lastName: string;
	userId: string;
	profilePicture: string | null;
	email: string;
	designation: string | null;
	version: number;
}

interface ViewCourseORMEntity {
	_id: ObjectId;
	status: CourseStatuses;
	title: string;
	description: string;
	category: string;
	currency: CoursePriceCurrencies;
	price: number;
	image: string;
	sections: ViewCourseSectionORMEntity[];
	languages: ViewCourseLanguageORMEntity[];
	learnings: ViewCourseLearningORMEntity[];
	materialsAndOffers: ViewCourseMaterialAndOfferORMEntity[];
	subtitles: ViewCourseSubtitleORMEntity[];
	creators: ViewCourseCreatorORMEntity[];
	totalStudents: number;
	creationDate: Date;
	lastModifiedDate: Date;
	createdBy: string;
	lastModifiedBy: string;
	isDeleted: boolean;
	version: number;
}

export {
	CourseORMEntity,
	ViewCourseORMEntity
};