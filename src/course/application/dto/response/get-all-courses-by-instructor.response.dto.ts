/* eslint-disable max-classes-per-file */
import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseStatuses,
	CourseSubtitles
} from "../../../domain";
import {
	GetAllCoursesByInstructorCreatorResponseDTO,
	GetAllCoursesByInstructorPriceResponseDTO,
	GetAllCoursesByInstructorRatingResponseDTO,
	GetAllCoursesByInstructorResponseDTO,
	GetAllCoursesByInstructorSectionLectureResponseDTO,
	GetAllCoursesByInstructorSectionLectureSubtitleResponseDTO,
	GetAllCoursesByInstructorSectionResponseDTO
} from "./get-all-courses-by-instructor.response.dto.type";


class GetAllCoursesByInstructorPriceResponseDTOImpl implements
	GetAllCoursesByInstructorPriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

class GetAllCoursesByInstructorCreatorResponseDTOImpl implements
	GetAllCoursesByInstructorCreatorResponseDTO {
	firstName: string;
	lastName: string;
	profilePicture: string | null = null;
	designation: string | null = null;
}

class GetAllCoursesByInstructorRatingResponseDTOImpl implements
	GetAllCoursesByInstructorRatingResponseDTO {
	value: number;
	totalCount: number;
}

class GetAllCoursesByInstructorSectionLectureSubtitleResponseDTOImpl implements
	GetAllCoursesByInstructorSectionLectureSubtitleResponseDTO {
	language: CourseSubtitles;
	url: string;
}

class GetAllCoursesByInstructorSectionLectureResponseDTOImpl implements
	GetAllCoursesByInstructorSectionLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	link: string;
	thumbnail: string | null = null;
	order: number;
}

class GetAllCoursesByInstructorSectionResponseDTOImpl implements
	GetAllCoursesByInstructorSectionResponseDTO {
	id: string;
	title: string;
	lectures: GetAllCoursesByInstructorSectionLectureResponseDTO[] = [];
	lecturesCount: number;
	lecturesDuration: number;
	order: number;
}

class GetAllCoursesByInstructorResponseDTOImpl implements
	GetAllCoursesByInstructorResponseDTO {
	id: string;
	status: CourseStatuses;
	title: string;
	description: string;
	category: string;
	rating: GetAllCoursesByInstructorRatingResponseDTO | null = null;
	totalStudents: number;
	creators: GetAllCoursesByInstructorCreatorResponseDTO[] = [];
	lastUpdatedOn: Date;
	languages: CourseLanguages[] = [];
	subtitles: CourseSubtitles[] = [];
	materialsAndOffers: string[] = [];
	price = new GetAllCoursesByInstructorPriceResponseDTOImpl();
	image: string;
	sections: GetAllCoursesByInstructorSectionResponseDTO[] = [];
	totalSectionsCount: number;
	totalLecturesCount: number;
	totalDuration: number;
}


export {
	GetAllCoursesByInstructorPriceResponseDTOImpl,
	GetAllCoursesByInstructorCreatorResponseDTOImpl,
	GetAllCoursesByInstructorRatingResponseDTOImpl,
	GetAllCoursesByInstructorSectionLectureSubtitleResponseDTOImpl,
	GetAllCoursesByInstructorSectionLectureResponseDTOImpl,
	GetAllCoursesByInstructorSectionResponseDTOImpl,
	GetAllCoursesByInstructorResponseDTOImpl
};