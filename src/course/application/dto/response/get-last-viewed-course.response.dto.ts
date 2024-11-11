/* eslint-disable max-classes-per-file */
import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseStatuses,
	CourseSubtitles
} from "../../../domain";
import {
	GetLastViewedCourseCreatorResponseDTO,
	GetLastViewedCourseLastViewedLectureResponseDTO,
	GetLastViewedCoursePriceResponseDTO,
	GetLastViewedCourseRatingResponseDTO,
	GetLastViewedCourseResponseDTO,
	GetLastViewedCourseSectionLectureResponseDTO,
	GetLastViewedCourseSectionLectureSubtitleResponseDTO,
	GetLastViewedCourseSectionResponseDTO
} from "./get-last-viewed-course.response.dto.type";



class GetLastViewedCoursePriceResponseDTOImpl implements
	GetLastViewedCoursePriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

class GetLastViewedCourseCreatorResponseDTOImpl implements
	GetLastViewedCourseCreatorResponseDTO {
	firstName: string;
	lastName: string;
	profilePicture: string | null = null;
	designation: string | null = null;
}

class GetLastViewedCourseRatingResponseDTOImpl implements
	GetLastViewedCourseRatingResponseDTO {
	value: number;
	totalCount: number;
}

class GetLastViewedCourseSectionLectureSubtitleResponseDTOImpl implements
	GetLastViewedCourseSectionLectureSubtitleResponseDTO {
	language: CourseSubtitles;
	url: string;
}

class GetLastViewedCourseSectionLectureResponseDTOImpl implements
	GetLastViewedCourseSectionLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	link: string;
	thumbnail: string | null = null;
	order: number;
	watchDuration: number;
}

class GetLastViewedCourseSectionResponseDTOImpl implements
	GetLastViewedCourseSectionResponseDTO {
	id: string;
	title: string;
	lectures: GetLastViewedCourseSectionLectureResponseDTO[] = [];
	lecturesCount: number;
	lecturesDuration: number;
	order: number;
}

class GetLastViewedCourseLastViewedLectureResponseDTOImpl implements
	GetLastViewedCourseLastViewedLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	link: string;
	thumbnail: string | null = null;
	order: number;
	watchDuration: number;
}

class GetLastViewedCourseResponseDTOImpl implements
	GetLastViewedCourseResponseDTO {
	id: string;
	status: CourseStatuses;
	title: string;
	description: string;
	category: string;
	rating: GetLastViewedCourseRatingResponseDTO | null = null;
	totalStudents: number;
	creators: GetLastViewedCourseCreatorResponseDTO[] = [];
	lastUpdatedOn: Date;
	languages: CourseLanguages[] = [];
	subtitles: CourseSubtitles[] = [];
	materialsAndOffers: string[] = [];
	price = new GetLastViewedCoursePriceResponseDTOImpl();
	image: string;
	sections: GetLastViewedCourseSectionResponseDTO[] = [];
	totalSectionsCount: number;
	totalLecturesCount: number;
	totalDuration: number;
	// eslint-disable-next-line max-len
	lastViewedLecture: GetLastViewedCourseLastViewedLectureResponseDTO | null = null;
}


export {
	GetLastViewedCoursePriceResponseDTOImpl,
	GetLastViewedCourseCreatorResponseDTOImpl,
	GetLastViewedCourseRatingResponseDTOImpl,
	GetLastViewedCourseSectionLectureSubtitleResponseDTOImpl,
	GetLastViewedCourseSectionLectureResponseDTOImpl,
	GetLastViewedCourseSectionResponseDTOImpl,
	GetLastViewedCourseLastViewedLectureResponseDTOImpl,
	GetLastViewedCourseResponseDTOImpl
};