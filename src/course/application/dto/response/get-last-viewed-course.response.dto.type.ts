import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseStatuses,
	CourseSubtitles
} from "../../../domain";


interface GetLastViewedCoursePriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

interface GetLastViewedCourseCreatorResponseDTO {
	firstName: string;
	lastName: string;
	profilePicture: string | null;
	designation: string | null;
}

interface GetLastViewedCourseRatingResponseDTO {
	value: number;
	totalCount: number;
}

interface GetLastViewedCourseSectionLectureSubtitleResponseDTO {
	language: CourseSubtitles;
	url: string;
}

interface GetLastViewedCourseSectionLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	thumbnail: string | null;
	order: number;
	watchDuration: number;
}

interface GetLastViewedCourseSectionResponseDTO {
	id: string;
	title: string;
	lectures: GetLastViewedCourseSectionLectureResponseDTO[];
	lecturesCount: number;
	lecturesDuration: number;
	order: number;
}

interface GetLastViewedCourseLastViewedLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	thumbnail: string | null;
	order: number;
	watchDuration: number;
}

interface GetLastViewedCourseResponseDTO {
	id: string;
	status: CourseStatuses;
	title: string;
	description: string;
	category: string;
	rating: GetLastViewedCourseRatingResponseDTO | null;
	totalStudents: number;
	creators: GetLastViewedCourseCreatorResponseDTO[];
	lastUpdatedOn: Date;
	languages: CourseLanguages[];
	subtitles: CourseSubtitles[];
	materialsAndOffers: string[];
	price: GetLastViewedCoursePriceResponseDTO;
	image: string;
	sections: GetLastViewedCourseSectionResponseDTO[];
	totalSectionsCount: number;
	totalLecturesCount: number;
	totalDuration: number;
	lastViewedLecture: GetLastViewedCourseLastViewedLectureResponseDTO | null;
}


export {
	GetLastViewedCoursePriceResponseDTO,
	GetLastViewedCourseCreatorResponseDTO,
	GetLastViewedCourseRatingResponseDTO,
	GetLastViewedCourseSectionLectureSubtitleResponseDTO,
	GetLastViewedCourseSectionLectureResponseDTO,
	GetLastViewedCourseSectionResponseDTO,
	GetLastViewedCourseLastViewedLectureResponseDTO,
	GetLastViewedCourseResponseDTO
};