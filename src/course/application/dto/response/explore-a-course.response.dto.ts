/* eslint-disable max-classes-per-file */
import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseStatuses,
	CourseSubtitles
} from "../../../domain";
import {
	ExploreACourseCreatorResponseDTO,
	ExploreACoursePriceResponseDTO,
	ExploreACourseRatingResponseDTO,
	ExploreACourseResponseDTO,
	ExploreACourseSectionLectureResponseDTO,
	ExploreACourseSectionLectureSubtitleResponseDTO,
	ExploreACourseSectionResponseDTO
} from "./explore-a-course.response.dto.type";


class ExploreACoursePriceResponseDTOImpl implements
	ExploreACoursePriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

class ExploreACourseCreatorResponseDTOImpl implements
	ExploreACourseCreatorResponseDTO {
	firstName: string;
	lastName: string;
	profilePicture: string | null = null;
	designation: string | null = null;
}

class ExploreACourseRatingResponseDTOImpl implements
	ExploreACourseRatingResponseDTO {
	value: number;
	totalCount: number;
}

class ExploreACourseSectionLectureSubtitleResponseDTOImpl implements
	ExploreACourseSectionLectureSubtitleResponseDTO {
	language: CourseSubtitles;
	url: string;
}

class ExploreACourseSectionLectureResponseDTOImpl implements
	ExploreACourseSectionLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	thumbnail: string | null = null;
	order: number;
}

class ExploreACourseSectionResponseDTOImpl implements
	ExploreACourseSectionResponseDTO {
	id: string;
	title: string;
	lectures: ExploreACourseSectionLectureResponseDTO[] = [];
	lecturesCount: number;
	lecturesDuration: number;
	order: number;
}

class ExploreACourseResponseDTOImpl implements
	ExploreACourseResponseDTO {
	id: string;
	status: CourseStatuses;
	title: string;
	description: string;
	category: string;
	rating: ExploreACourseRatingResponseDTO | null = null;
	totalStudents: number;
	creators: ExploreACourseCreatorResponseDTO[] = [];
	lastUpdatedOn: Date;
	languages: CourseLanguages[] = [];
	subtitles: CourseSubtitles[] = [];
	materialsAndOffers: string[] = [];
	price = new ExploreACoursePriceResponseDTOImpl();
	image: string;
	sections: ExploreACourseSectionResponseDTO[] = [];
	totalSectionsCount: number;
	totalLecturesCount: number;
	totalDuration: number;
	isStudentEnrolledForCourse: boolean;
}


export {
	ExploreACoursePriceResponseDTOImpl,
	ExploreACourseCreatorResponseDTOImpl,
	ExploreACourseRatingResponseDTOImpl,
	ExploreACourseSectionLectureSubtitleResponseDTOImpl,
	ExploreACourseSectionLectureResponseDTOImpl,
	ExploreACourseSectionResponseDTOImpl,
	ExploreACourseResponseDTOImpl
};