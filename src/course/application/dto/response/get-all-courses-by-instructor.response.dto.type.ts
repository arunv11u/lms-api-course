import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseStatuses,
	CourseSubtitles
} from "../../../domain";


interface GetAllCoursesByInstructorPriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

interface GetAllCoursesByInstructorCreatorResponseDTO {
	firstName: string;
	lastName: string;
	profilePicture: string | null;
	designation: string | null;
}

interface GetAllCoursesByInstructorRatingResponseDTO {
	value: number;
	totalCount: number;
}

interface GetAllCoursesByInstructorSectionLectureSubtitleResponseDTO {
	language: CourseSubtitles;
	url: string;
}

interface GetAllCoursesByInstructorSectionLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	link: string;
	thumbnail: string | null;
	order: number;
}

interface GetAllCoursesByInstructorSectionResponseDTO {
	id: string;
	title: string;
	lectures: GetAllCoursesByInstructorSectionLectureResponseDTO[];
	lecturesCount: number;
	lecturesDuration: number;
	order: number;
}

interface GetAllCoursesByInstructorResponseDTO {
	id: string;
	status: CourseStatuses;
	title: string;
	description: string;
	category: string;
	rating: GetAllCoursesByInstructorRatingResponseDTO | null;
	totalStudents: number;
	creators: GetAllCoursesByInstructorCreatorResponseDTO[];
	lastUpdatedOn: Date;
	languages: CourseLanguages[];
	subtitles: CourseSubtitles[];
	materialsAndOffers: string[];
	price: GetAllCoursesByInstructorPriceResponseDTO;
	image: string;
	sections: GetAllCoursesByInstructorSectionResponseDTO[];
	totalSectionsCount: number;
	totalLecturesCount: number;
	totalDuration: number;
}


export {
	GetAllCoursesByInstructorPriceResponseDTO,
	GetAllCoursesByInstructorCreatorResponseDTO,
	GetAllCoursesByInstructorRatingResponseDTO,
	GetAllCoursesByInstructorSectionLectureSubtitleResponseDTO,
	GetAllCoursesByInstructorSectionLectureResponseDTO,
	GetAllCoursesByInstructorSectionResponseDTO,
	GetAllCoursesByInstructorResponseDTO
};