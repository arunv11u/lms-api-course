/* eslint-disable max-classes-per-file */
import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseStatuses,
	CourseSubtitles
} from "../../../domain";
import { 
	GetMyCourseCreatorResponseDTO,
	GetMyCoursePriceResponseDTO, 
	GetMyCourseRatingResponseDTO,
	GetMyCourseResponseDTO,
	GetMyCourseSectionLectureResponseDTO,
	GetMyCourseSectionLectureSubtitleResponseDTO,
	GetMyCourseSectionResponseDTO
} from "./get-my-course.response.dto.type";


class GetMyCoursePriceResponseDTOImpl implements
	GetMyCoursePriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

class GetMyCourseCreatorResponseDTOImpl implements
	GetMyCourseCreatorResponseDTO {
	firstName: string;
	lastName: string;
	profilePicture: string | null = null;
	designation: string | null = null;
}

class GetMyCourseRatingResponseDTOImpl implements
	GetMyCourseRatingResponseDTO {
	value: number;
	totalCount: number;
}

class GetMyCourseSectionLectureSubtitleResponseDTOImpl implements
	GetMyCourseSectionLectureSubtitleResponseDTO {
	language: CourseSubtitles;
	url: string;
}

class GetMyCourseSectionLectureResponseDTOImpl implements
	GetMyCourseSectionLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	link: string;
	thumbnail: string | null = null;
	order: number;
}

class GetMyCourseSectionResponseDTOImpl implements
	GetMyCourseSectionResponseDTO {
	id: string;
	title: string;
	lectures: GetMyCourseSectionLectureResponseDTO[] = [];
	lecturesCount: number;
	lecturesDuration: number;
	order: number;
}

class GetMyCourseResponseDTOImpl implements
	GetMyCourseResponseDTO {
	id: string;
	status: CourseStatuses;
	title: string;
	description: string;
	category: string;
	rating: GetMyCourseRatingResponseDTO | null = null;
	totalStudents: number;
	creators: GetMyCourseCreatorResponseDTO[] = [];
	lastUpdatedOn: Date;
	languages: CourseLanguages[] = [];
	subtitles: CourseSubtitles[] = [];
	materialsAndOffers: string[] = [];
	price = new GetMyCoursePriceResponseDTOImpl();
	image: string;
	sections: GetMyCourseSectionResponseDTO[] = [];
	totalSectionsCount: number;
	totalLecturesCount: number;
	totalDuration: number;
}


export {
	GetMyCoursePriceResponseDTOImpl,
	GetMyCourseCreatorResponseDTOImpl,
	GetMyCourseRatingResponseDTOImpl,
	GetMyCourseSectionLectureSubtitleResponseDTOImpl,
	GetMyCourseSectionLectureResponseDTOImpl,
	GetMyCourseSectionResponseDTOImpl,
	GetMyCourseResponseDTOImpl
};