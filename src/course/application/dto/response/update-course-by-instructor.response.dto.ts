/* eslint-disable max-classes-per-file */
import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseStatuses,
	CourseSubtitles
} from "../../../domain";
import {
	UpdateCourseByInstructorCreatorResponseDTO,
	UpdateCourseByInstructorPriceResponseDTO,
	UpdateCourseByInstructorRatingResponseDTO,
	UpdateCourseByInstructorResponseDTO,
	UpdateCourseByInstructorSectionLectureResponseDTO,
	UpdateCourseByInstructorSectionLectureSubtitleResponseDTO,
	UpdateCourseByInstructorSectionResponseDTO
} from "./update-course-by-instructor.response.dto.type";


class UpdateCourseByInstructorPriceResponseDTOImpl implements
	UpdateCourseByInstructorPriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

class UpdateCourseByInstructorCreatorResponseDTOImpl implements
	UpdateCourseByInstructorCreatorResponseDTO {
	firstName: string;
	lastName: string;
	profilePicture: string | null = null;
	designation: string | null = null;
}

class UpdateCourseByInstructorRatingResponseDTOImpl implements
	UpdateCourseByInstructorRatingResponseDTO {
	value: number;
	totalCount: number;
}

class UpdateCourseByInstructorSectionLectureSubtitleResponseDTOImpl implements
	UpdateCourseByInstructorSectionLectureSubtitleResponseDTO {
	language: CourseSubtitles;
	url: string;
}

class UpdateCourseByInstructorSectionLectureResponseDTOImpl implements
	UpdateCourseByInstructorSectionLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	link: string;
	thumbnail: string | null = null;
	subtitles: UpdateCourseByInstructorSectionLectureSubtitleResponseDTO[] = [];
	order: number;
}

class UpdateCourseByInstructorSectionResponseDTOImpl implements
	UpdateCourseByInstructorSectionResponseDTO {
	id: string;
	title: string;
	lectures: UpdateCourseByInstructorSectionLectureResponseDTO[] = [];
	lecturesCount: number;
	lecturesDuration: number;
	order: number;
}

class UpdateCourseByInstructorResponseDTOImpl implements
	UpdateCourseByInstructorResponseDTO {
	id: string;
	status: CourseStatuses;
	title: string;
	description: string;
	category: string;
	rating: UpdateCourseByInstructorRatingResponseDTO | null = null;
	totalStudents: number;
	creators: UpdateCourseByInstructorCreatorResponseDTO[] = [];
	lastUpdatedOn: Date;
	languages: CourseLanguages[] = [];
	subtitles: CourseSubtitles[] = [];
	materialsAndOffers: string[] = [];
	price = new UpdateCourseByInstructorPriceResponseDTOImpl();
	image: string;
	sections: UpdateCourseByInstructorSectionResponseDTO[] = [];
	totalSectionsCount: number;
	totalLecturesCount: number;
	totalDuration: number;
}


export {
	UpdateCourseByInstructorCreatorResponseDTOImpl,
	UpdateCourseByInstructorRatingResponseDTOImpl,
	UpdateCourseByInstructorSectionLectureSubtitleResponseDTOImpl,
	UpdateCourseByInstructorSectionLectureResponseDTOImpl,
	UpdateCourseByInstructorSectionResponseDTOImpl,
	UpdateCourseByInstructorResponseDTOImpl
};