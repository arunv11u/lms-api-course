/* eslint-disable max-classes-per-file */
import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseSubtitles
} from "../../../domain";
import {
	UpdateCourseByInstructorPriceRequestDTO,
	UpdateCourseByInstructorRequestDTO,
	UpdateCourseByInstructorSectionLectureRequestDTO,
	UpdateCourseByInstructorSectionLectureSubtitleRequestDTO,
	UpdateCourseByInstructorSectionRequestDTO
} from "./update-course-by-instructor.request.dto.type";


class UpdateCourseByInstructorSectionLectureSubtitleRequestDTOImpl implements
	UpdateCourseByInstructorSectionLectureSubtitleRequestDTO {
	language: CourseSubtitles;
	url: string;
}

class UpdateCourseByInstructorSectionLectureRequestDTOImpl implements
	UpdateCourseByInstructorSectionLectureRequestDTO {
	id: string | null = null;
	title: string;
	description: string;
	link: string;
	subtitles: UpdateCourseByInstructorSectionLectureSubtitleRequestDTO[] = [];
	order: number;
}

class UpdateCourseByInstructorSectionRequestDTOImpl implements
	UpdateCourseByInstructorSectionRequestDTO {
	id: string | null = null;
	title: string;
	lectures: UpdateCourseByInstructorSectionLectureRequestDTO[] = [];
	order: number;
}

class UpdateCourseByInstructorPriceRequestDTOImpl implements
	UpdateCourseByInstructorPriceRequestDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

class UpdateCourseByInstructorRequestDTOImpl implements
	UpdateCourseByInstructorRequestDTO {
	id: string;
	title: string;
	description: string;
	category: string;
	languages: CourseLanguages[] = [];
	subtitles: CourseSubtitles[] = [];
	learnings: string[] = [];
	materialsAndOffers: string[] = [];
	price = new UpdateCourseByInstructorPriceRequestDTOImpl();
	image: string;
	sections: UpdateCourseByInstructorSectionRequestDTO[] = [];
	authorizationToken: string;
}

export {
	UpdateCourseByInstructorSectionLectureSubtitleRequestDTOImpl,
	UpdateCourseByInstructorSectionLectureRequestDTOImpl,
	UpdateCourseByInstructorSectionRequestDTOImpl,
	UpdateCourseByInstructorRequestDTOImpl
};