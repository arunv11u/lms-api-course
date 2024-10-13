/* eslint-disable max-classes-per-file */
import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseStatuses,
	CourseSubtitles
} from "../../../domain";
import {
	ExploreAllCoursesCreatorResponseDTO,
	ExploreAllCoursesPriceResponseDTO,
	ExploreAllCoursesRatingResponseDTO,
	ExploreAllCoursesResponseDTO,
	ExploreAllCoursesSectionLectureResponseDTO,
	ExploreAllCoursesSectionLectureSubtitleResponseDTO,
	ExploreAllCoursesSectionResponseDTO
} from "./explore-all-courses.response.dto.type";


class ExploreAllCoursesPriceResponseDTOImpl implements
	ExploreAllCoursesPriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

class ExploreAllCoursesCreatorResponseDTOImpl implements
	ExploreAllCoursesCreatorResponseDTO {
	firstName: string;
	lastName: string;
	profilePicture: string | null = null;
	designation: string | null = null;
}

class ExploreAllCoursesRatingResponseDTOImpl implements
	ExploreAllCoursesRatingResponseDTO {
	value: number;
	totalCount: number;
}

class ExploreAllCoursesSectionLectureSubtitleResponseDTOImpl implements
	ExploreAllCoursesSectionLectureSubtitleResponseDTO {
	language: CourseSubtitles;
	url: string;
}

class ExploreAllCoursesSectionLectureResponseDTOImpl implements
	ExploreAllCoursesSectionLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	thumbnail: string | null = null;
	order: number;
}

class ExploreAllCoursesSectionResponseDTOImpl implements
	ExploreAllCoursesSectionResponseDTO {
	id: string;
	title: string;
	lectures: ExploreAllCoursesSectionLectureResponseDTO[] = [];
	lecturesCount: number;
	lecturesDuration: number;
	order: number;
}

class ExploreAllCoursesResponseDTOImpl implements
	ExploreAllCoursesResponseDTO {
	id: string;
	status: CourseStatuses;
	title: string;
	description: string;
	category: string;
	rating: ExploreAllCoursesRatingResponseDTO | null = null;
	totalStudents: number;
	creators: ExploreAllCoursesCreatorResponseDTO[] = [];
	lastUpdatedOn: Date;
	languages: CourseLanguages[] = [];
	subtitles: CourseSubtitles[] = [];
	materialsAndOffers: string[] = [];
	price = new ExploreAllCoursesPriceResponseDTOImpl();
	image: string;
	sections: ExploreAllCoursesSectionResponseDTO[] = [];
	totalSectionsCount: number;
	totalLecturesCount: number;
	totalDuration: number;
}


export {
	ExploreAllCoursesPriceResponseDTOImpl,
	ExploreAllCoursesCreatorResponseDTOImpl,
	ExploreAllCoursesRatingResponseDTOImpl,
	ExploreAllCoursesSectionLectureSubtitleResponseDTOImpl,
	ExploreAllCoursesSectionLectureResponseDTOImpl,
	ExploreAllCoursesSectionResponseDTOImpl,
	ExploreAllCoursesResponseDTOImpl
};