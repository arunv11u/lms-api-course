import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseStatuses,
	CourseSubtitles
} from "../../../domain";


interface UpdateCourseByInstructorPriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

interface UpdateCourseByInstructorCreatorResponseDTO {
	firstName: string;
	lastName: string;
	profilePicture: string | null;
	designation: string | null;
}

interface UpdateCourseByInstructorRatingResponseDTO {
	value: number;
	totalCount: number;
}

interface UpdateCourseByInstructorSectionLectureSubtitleResponseDTO {
	language: CourseSubtitles;
	url: string;
}

interface UpdateCourseByInstructorSectionLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	link: string;
	thumbnail: string | null;
	subtitles: UpdateCourseByInstructorSectionLectureSubtitleResponseDTO[];
	order: number;
}

interface UpdateCourseByInstructorSectionResponseDTO {
	id: string;
	title: string;
	lectures: UpdateCourseByInstructorSectionLectureResponseDTO[];
	lecturesCount: number;
	lecturesDuration: number;
	order: number;
}

interface UpdateCourseByInstructorResponseDTO {
	id: string;
	status: CourseStatuses;
	title: string;
	description: string;
	category: string;
	rating: UpdateCourseByInstructorRatingResponseDTO | null;
	totalStudents: number;
	creators: UpdateCourseByInstructorCreatorResponseDTO[];
	lastUpdatedOn: Date;
	languages: CourseLanguages[];
	subtitles: CourseSubtitles[];
	materialsAndOffers: string[];
	price: UpdateCourseByInstructorPriceResponseDTO;
	image: string;
	sections: UpdateCourseByInstructorSectionResponseDTO[];
	totalSectionsCount: number;
	totalLecturesCount: number;
	totalDuration: number;
}


export {
	UpdateCourseByInstructorPriceResponseDTO,
	UpdateCourseByInstructorCreatorResponseDTO,
	UpdateCourseByInstructorRatingResponseDTO,
	UpdateCourseByInstructorSectionLectureSubtitleResponseDTO,
	UpdateCourseByInstructorSectionLectureResponseDTO,
	UpdateCourseByInstructorSectionResponseDTO,
	UpdateCourseByInstructorResponseDTO
};