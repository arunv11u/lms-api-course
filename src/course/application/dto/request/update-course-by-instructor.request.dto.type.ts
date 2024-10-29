import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseSubtitles
} from "../../../domain";


interface UpdateCourseByInstructorSectionLectureSubtitleRequestDTO {
	language: CourseSubtitles;
	url: string;
}

interface UpdateCourseByInstructorSectionLectureRequestDTO {
	id: string | null;
	title: string;
	description: string;
	link: string;
	subtitles: UpdateCourseByInstructorSectionLectureSubtitleRequestDTO[];
	order: number;
}

interface UpdateCourseByInstructorSectionRequestDTO {
	id: string | null;
	title: string;
	lectures: UpdateCourseByInstructorSectionLectureRequestDTO[];
	order: number;
}

interface UpdateCourseByInstructorPriceRequestDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

interface UpdateCourseByInstructorRequestDTO {
	id: string;
	title: string;
	description: string;
	category: string;
	languages: CourseLanguages[];
	subtitles: CourseSubtitles[];
	learnings: string[];
	materialsAndOffers: string[];
	price: UpdateCourseByInstructorPriceRequestDTO;
	image: string;
	sections: UpdateCourseByInstructorSectionRequestDTO[];
	authorizationToken: string;
}

export {
	UpdateCourseByInstructorSectionLectureSubtitleRequestDTO,
	UpdateCourseByInstructorSectionLectureRequestDTO,
	UpdateCourseByInstructorSectionRequestDTO,
	UpdateCourseByInstructorPriceRequestDTO,
	UpdateCourseByInstructorRequestDTO
};