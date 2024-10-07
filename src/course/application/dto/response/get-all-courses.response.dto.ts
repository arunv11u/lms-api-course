/* eslint-disable max-classes-per-file */
import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseSubtitles
} from "../../../domain";
import {
	CourseCreatorResponseDTO,
	GetAllCoursesDocResponseDTO,
	GetAllCoursesPriceResponseDTO,
	GetAllCoursesRatingResponseDTO,
	GetAllCoursesResponseDTO,
	GetAllCoursesSectionLectureResponseDTO,
	GetAllCoursesSectionResponseDTO
} from "./get-all-courses.response.dto.type";


class GetAllCoursesRatingResponseDTOImpl implements
	GetAllCoursesRatingResponseDTO {
	totalCount: number;
	value: number;
}

class GetAllCoursesPriceResponseDTOImpl implements
	GetAllCoursesPriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

class GetAllCoursesSectionLectureResponseDTOImpl implements
	GetAllCoursesSectionLectureResponseDTO {
	description: string;
	duration: number;
	id: string;
	link: string;
	thumbnail: string;
	title: string;
}

class GetAllCoursesSectionResponseDTOImpl implements
	GetAllCoursesSectionResponseDTO {
	id: string;
	lectures: GetAllCoursesSectionLectureResponseDTO[] = [];
	lecturesCount: number;
	lecturesDuration: number;
	title: string;
}

class CourseCreatorResponseDTOImpl implements CourseCreatorResponseDTO {
	designation: string;
	firstName: string;
	lastName: string;
	profilePicture: string;
}

class GetAllCoursesDocResponseDTOImpl implements
	GetAllCoursesDocResponseDTO {
	creators: CourseCreatorResponseDTO[] = [];
	description: string;
	id: string;
	image: string;
	languages: CourseLanguages[] = [];
	lastUpdatedOn: Date;
	learnings: string[] = [];
	materialsAndOffers: string[] = [];
	price = new GetAllCoursesPriceResponseDTOImpl();
	rating = new GetAllCoursesRatingResponseDTOImpl();
	sections: GetAllCoursesSectionResponseDTO[] = [];
	subtitles: CourseSubtitles[] = [];
	title: string;
	totalDuration: number;
	totalLecturesCount: number;
	totalSectionsCount: number;
	totalStudents: number;
}

class GetAllCoursesResponseDTOImpl implements GetAllCoursesResponseDTO {
	count: number;
	docs: GetAllCoursesDocResponseDTO[] = [];
}

export {
	GetAllCoursesSectionLectureResponseDTOImpl,
	GetAllCoursesSectionResponseDTOImpl,
	CourseCreatorResponseDTOImpl,
	GetAllCoursesDocResponseDTOImpl,
	GetAllCoursesResponseDTOImpl
};