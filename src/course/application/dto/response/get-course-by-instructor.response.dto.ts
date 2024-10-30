/* eslint-disable max-classes-per-file */
import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseStatuses,
	CourseSubtitles
} from "../../../domain";
import {
	GetCourseByInstructorCreatorResponseDTO,
	GetCourseByInstructorPriceResponseDTO,
	GetCourseByInstructorRatingResponseDTO,
	GetCourseByInstructorResponseDTO,
	GetCourseByInstructorSectionLectureResponseDTO,
	GetCourseByInstructorSectionLectureSubtitleResponseDTO,
	GetCourseByInstructorSectionResponseDTO
} from "./get-course-by-instructor.response.dto.type";


class GetCourseByInstructorPriceResponseDTOImpl implements
	GetCourseByInstructorPriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

class GetCourseByInstructorCreatorResponseDTOImpl implements
	GetCourseByInstructorCreatorResponseDTO {
	firstName: string;
	lastName: string;
	profilePicture: string | null = null;
	designation: string | null = null;
}

class GetCourseByInstructorRatingResponseDTOImpl implements
	GetCourseByInstructorRatingResponseDTO {
	value: number;
	totalCount: number;
}

class GetCourseByInstructorSectionLectureSubtitleResponseDTOImpl implements
	GetCourseByInstructorSectionLectureSubtitleResponseDTO {
	language: CourseSubtitles;
	url: string;
}

class GetCourseByInstructorSectionLectureResponseDTOImpl implements
	GetCourseByInstructorSectionLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	link: string;
	thumbnail: string | null = null;
	subtitles: GetCourseByInstructorSectionLectureSubtitleResponseDTO[] = [];
	order: number;
}

class GetCourseByInstructorSectionResponseDTOImpl implements
	GetCourseByInstructorSectionResponseDTO {
	id: string;
	title: string;
	lectures: GetCourseByInstructorSectionLectureResponseDTO[] = [];
	lecturesCount: number;
	lecturesDuration: number;
	order: number;
}

class GetCourseByInstructorResponseDTOImpl implements
	GetCourseByInstructorResponseDTO {
	id: string;
	status: CourseStatuses;
	title: string;
	description: string;
	category: string;
	rating: GetCourseByInstructorRatingResponseDTO | null = null;
	totalStudents: number;
	creators: GetCourseByInstructorCreatorResponseDTO[] = [];
	lastUpdatedOn: Date;
	languages: CourseLanguages[] = [];
	subtitles: CourseSubtitles[] = [];
	materialsAndOffers: string[] = [];
	price = new GetCourseByInstructorPriceResponseDTOImpl();
	image: string;
	sections: GetCourseByInstructorSectionResponseDTO[] = [];
	totalSectionsCount: number;
	totalLecturesCount: number;
	totalDuration: number;
}


export {
	GetCourseByInstructorCreatorResponseDTOImpl,
	GetCourseByInstructorRatingResponseDTOImpl,
	GetCourseByInstructorSectionLectureSubtitleResponseDTOImpl,
	GetCourseByInstructorSectionLectureResponseDTOImpl,
	GetCourseByInstructorSectionResponseDTOImpl,
	GetCourseByInstructorResponseDTOImpl
};