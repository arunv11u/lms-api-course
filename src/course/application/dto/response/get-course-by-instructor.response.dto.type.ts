import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseStatuses,
	CourseSubtitles
} from "../../../domain";


interface GetCourseByInstructorPriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

interface GetCourseByInstructorCreatorResponseDTO {
	firstName: string;
	lastName: string;
	profilePicture: string | null;
	designation: string | null;
}

interface GetCourseByInstructorRatingResponseDTO {
	value: number;
	totalCount: number;
}

interface GetCourseByInstructorSectionLectureSubtitleResponseDTO {
	language: CourseSubtitles;
	url: string;
}

interface GetCourseByInstructorSectionLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	link: string;
	thumbnail: string | null;
	subtitles: GetCourseByInstructorSectionLectureSubtitleResponseDTO[];
	order: number;
}

interface GetCourseByInstructorSectionResponseDTO {
	id: string;
	title: string;
	lectures: GetCourseByInstructorSectionLectureResponseDTO[];
	lecturesCount: number;
	lecturesDuration: number;
	order: number;
}

interface GetCourseByInstructorResponseDTO {
	id: string;
	status: CourseStatuses;
	title: string;
	description: string;
	category: string;
	rating: GetCourseByInstructorRatingResponseDTO | null;
	totalStudents: number;
	creators: GetCourseByInstructorCreatorResponseDTO[];
	lastUpdatedOn: Date;
	languages: CourseLanguages[];
	subtitles: CourseSubtitles[];
	materialsAndOffers: string[];
	price: GetCourseByInstructorPriceResponseDTO;
	image: string;
	sections: GetCourseByInstructorSectionResponseDTO[];
	totalSectionsCount: number;
	totalLecturesCount: number;
	totalDuration: number;
}


export {
	GetCourseByInstructorPriceResponseDTO,
	GetCourseByInstructorCreatorResponseDTO,
	GetCourseByInstructorRatingResponseDTO,
	GetCourseByInstructorSectionLectureSubtitleResponseDTO,
	GetCourseByInstructorSectionLectureResponseDTO,
	GetCourseByInstructorSectionResponseDTO,
	GetCourseByInstructorResponseDTO
};