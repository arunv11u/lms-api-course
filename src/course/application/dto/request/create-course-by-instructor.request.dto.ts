/* eslint-disable max-classes-per-file */
import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseSubtitles
} from "../../../domain";
import {
	CreateCourseByInstructorPriceRequestDTO,
	CreateCourseByInstructorRequestDTO,
	CreateCourseByInstructorSectionLectureRequestDTO,
	CreateCourseByInstructorSectionLectureSubtitleRequestDTO,
	CreateCourseByInstructorSectionRequestDTO
} from "./create-course-by-instructor.request.dto.type";


class CreateCourseByInstructorSectionLectureSubtitleRequestDTOImpl implements
	CreateCourseByInstructorSectionLectureSubtitleRequestDTO {
	language: CourseSubtitles;
	url: string;
}

class CreateCourseByInstructorSectionLectureRequestDTOImpl implements
	CreateCourseByInstructorSectionLectureRequestDTO {
	title: string;
	description: string;
	link: string;
	subtitles: CreateCourseByInstructorSectionLectureSubtitleRequestDTO[] = [];
	order: number;
}

class CreateCourseByInstructorSectionRequestDTOImpl implements
	CreateCourseByInstructorSectionRequestDTO {
	title: string;
	lectures: CreateCourseByInstructorSectionLectureRequestDTO[] = [];
	order: number;
}

class CreateCourseByInstructorPriceRequestDTOImpl implements
	CreateCourseByInstructorPriceRequestDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

class CreateCourseByInstructorRequestDTOImpl implements
	CreateCourseByInstructorRequestDTO {
	title: string;
	description: string;
	category: string;
	languages: CourseLanguages[] = [];
	subtitles: CourseSubtitles[] = [];
	learnings: string[] = [];
	materialsAndOffers: string[] = [];
	price = new CreateCourseByInstructorPriceRequestDTOImpl();
	image: string;
	sections: CreateCourseByInstructorSectionRequestDTO[] = [];
	authorizationToken: string;
}

export {
	CreateCourseByInstructorSectionLectureSubtitleRequestDTOImpl,
	CreateCourseByInstructorSectionLectureRequestDTOImpl,
	CreateCourseByInstructorSectionRequestDTOImpl,
	CreateCourseByInstructorPriceRequestDTOImpl,
	CreateCourseByInstructorRequestDTOImpl
};