import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseSubtitles
} from "../../../domain";


interface GetAllCoursesRatingResponseDTO {
	value: number;
	totalCount: number;
}

interface GetAllCoursesPriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

interface GetAllCoursesSectionLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	link: string;
	thumbnail: string;
}

interface GetAllCoursesSectionResponseDTO {
	id: string;
	title: string;
	lectures: GetAllCoursesSectionLectureResponseDTO[];
	lecturesCount: number;
	lecturesDuration: number;
}

interface GetAllCoursesDocResponseDTO {
	id: string;
	title: string;
	description: string;
	rating: GetAllCoursesRatingResponseDTO;
	totalStudents: number;
	creators: string[];
	lastUpdatedOn: Date;
	languages: CourseLanguages[];
	subtitles: CourseSubtitles[];
	learnings: string[];
	materialsAndOffers: string[];
	price: GetAllCoursesPriceResponseDTO;
	image: string;
	sections: GetAllCoursesSectionResponseDTO[];
	totalSectionsCount: number;
	totalLecturesCount: number;
	totalDuration: number;
}

interface GetAllCoursesResponseDTO {
	docs: GetAllCoursesDocResponseDTO[];
	count: number;
}

export {
	GetAllCoursesRatingResponseDTO,
	GetAllCoursesPriceResponseDTO,
	GetAllCoursesSectionLectureResponseDTO,
	GetAllCoursesSectionResponseDTO,
	GetAllCoursesDocResponseDTO,
	GetAllCoursesResponseDTO
};