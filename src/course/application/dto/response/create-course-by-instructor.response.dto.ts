/* eslint-disable max-classes-per-file */
import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseStatuses,
	CourseSubtitles
} from "../../../domain";
import {
	CreateCourseByInstructorCreatorResponseDTO,
	CreateCourseByInstructorPriceResponseDTO,
	CreateCourseByInstructorRatingResponseDTO,
	CreateCourseByInstructorResponseDTO,
	CreateCourseByInstructorSectionLectureResponseDTO,
	CreateCourseByInstructorSectionLectureSubtitleResponseDTO,
	CreateCourseByInstructorSectionResponseDTO
} from "./create-course-by-instructor.response.dto.type";


class CreateCourseByInstructorPriceResponseDTOImpl implements
	CreateCourseByInstructorPriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

class CreateCourseByInstructorCreatorResponseDTOImpl implements
	CreateCourseByInstructorCreatorResponseDTO {
	firstName: string;
	lastName: string;
	profilePicture: string | null = null;
	designation: string | null = null;
}

class CreateCourseByInstructorRatingResponseDTOImpl implements
	CreateCourseByInstructorRatingResponseDTO {
	value: number;
	totalCount: number;
}

class CreateCourseByInstructorSectionLectureSubtitleResponseDTOImpl implements
	CreateCourseByInstructorSectionLectureSubtitleResponseDTO {
	language: CourseSubtitles;
	url: string;
}

class CreateCourseByInstructorSectionLectureResponseDTOImpl implements
	CreateCourseByInstructorSectionLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	link: string;
	thumbnail: string | null = null;
	subtitles: CreateCourseByInstructorSectionLectureSubtitleResponseDTO[] = [];
	order: number;
}

class CreateCourseByInstructorSectionResponseDTOImpl implements
	CreateCourseByInstructorSectionResponseDTO {
	id: string;
	title: string;
	lectures: CreateCourseByInstructorSectionLectureResponseDTO[] = [];
	lecturesCount: number;
	lecturesDuration: number;
	order: number;
}

class CreateCourseByInstructorResponseDTOImpl implements
	CreateCourseByInstructorResponseDTO {
	id: string;
	status: CourseStatuses;
	title: string;
	description: string;
	category: string;
	rating: CreateCourseByInstructorRatingResponseDTO | null = null;
	totalStudents: number;
	creators: CreateCourseByInstructorCreatorResponseDTO[] = [];
	lastUpdatedOn: Date;
	languages: CourseLanguages[] = [];
	subtitles: CourseSubtitles[] = [];
	materialsAndOffers: string[] = [];
	price = new CreateCourseByInstructorPriceResponseDTOImpl();
	image: string;
	sections: CreateCourseByInstructorSectionResponseDTO[] = [];
	totalSectionsCount: number;
	totalLecturesCount: number;
	totalDuration: number;
}


export {
	CreateCourseByInstructorCreatorResponseDTOImpl,
	CreateCourseByInstructorRatingResponseDTOImpl,
	CreateCourseByInstructorSectionLectureSubtitleResponseDTOImpl,
	CreateCourseByInstructorSectionLectureResponseDTOImpl,
	CreateCourseByInstructorSectionResponseDTOImpl,
	CreateCourseByInstructorResponseDTOImpl
};