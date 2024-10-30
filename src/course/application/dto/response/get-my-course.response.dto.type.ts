import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseStatuses,
	CourseSubtitles
} from "../../../domain";


interface GetMyCoursePriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

interface GetMyCourseCreatorResponseDTO {
	firstName: string;
	lastName: string;
	profilePicture: string | null;
	designation: string | null;
}

interface GetMyCourseRatingResponseDTO {
	value: number;
	totalCount: number;
}

interface GetMyCourseSectionLectureSubtitleResponseDTO {
	language: CourseSubtitles;
	url: string;
}

interface GetMyCourseSectionLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	thumbnail: string | null;
	order: number;
}

interface GetMyCourseSectionResponseDTO {
	id: string;
	title: string;
	lectures: GetMyCourseSectionLectureResponseDTO[];
	lecturesCount: number;
	lecturesDuration: number;
	order: number;
}

interface GetMyCourseResponseDTO {
	id: string;
	status: CourseStatuses;
	title: string;
	description: string;
	category: string;
	rating: GetMyCourseRatingResponseDTO | null;
	totalStudents: number;
	creators: GetMyCourseCreatorResponseDTO[];
	lastUpdatedOn: Date;
	languages: CourseLanguages[];
	subtitles: CourseSubtitles[];
	materialsAndOffers: string[];
	price: GetMyCoursePriceResponseDTO;
	image: string;
	sections: GetMyCourseSectionResponseDTO[];
	totalSectionsCount: number;
	totalLecturesCount: number;
	totalDuration: number;
}


export {
	GetMyCoursePriceResponseDTO,
	GetMyCourseCreatorResponseDTO,
	GetMyCourseRatingResponseDTO,
	GetMyCourseSectionLectureSubtitleResponseDTO,
	GetMyCourseSectionLectureResponseDTO,
	GetMyCourseSectionResponseDTO,
	GetMyCourseResponseDTO
};