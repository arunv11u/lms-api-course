import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseSubtitles
} from "../../../domain";


interface CreateCourseByInstructorSectionLectureSubtitleRequestDTO {
	language: CourseSubtitles;
	url: string;
}

interface CreateCourseByInstructorSectionLectureRequestDTO {
	title: string;
	description: string;
	link: string;
	subtitles: CreateCourseByInstructorSectionLectureSubtitleRequestDTO[];
	order: number;
}

interface CreateCourseByInstructorSectionRequestDTO {
	title: string;
	lectures: CreateCourseByInstructorSectionLectureRequestDTO[];
	order: number;
}

interface CreateCourseByInstructorPriceRequestDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

interface CreateCourseByInstructorRequestDTO {
	title: string;
	description: string;
	category: string;
	languages: CourseLanguages[];
	subtitles: CourseSubtitles[];
	learnings: string[];
	materialsAndOffers: string[];
	price: CreateCourseByInstructorPriceRequestDTO;
	image: string;
	sections: CreateCourseByInstructorSectionRequestDTO[];
	authorizationToken: string;
}

export {
	CreateCourseByInstructorSectionLectureSubtitleRequestDTO,
	CreateCourseByInstructorSectionLectureRequestDTO,
	CreateCourseByInstructorSectionRequestDTO,
	CreateCourseByInstructorPriceRequestDTO,
	CreateCourseByInstructorRequestDTO
};