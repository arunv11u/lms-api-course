import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseStatuses,
	CourseSubtitles
} from "../../../domain";


interface CreateCourseByInstructorPriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

interface CreateCourseByInstructorCreatorResponseDTO {
	firstName: string;
	lastName: string;
	profilePicture: string | null;
	designation: string | null;
}

interface CreateCourseByInstructorRatingResponseDTO {
	value: number;
	totalCount: number;
}

interface CreateCourseByInstructorSectionLectureSubtitleResponseDTO {
	language: CourseSubtitles;
	url: string;
}

interface CreateCourseByInstructorSectionLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	link: string;
	thumbnail: string | null;
	subtitles: CreateCourseByInstructorSectionLectureSubtitleResponseDTO[];
	order: number;
}

interface CreateCourseByInstructorSectionResponseDTO {
	id: string;
	title: string;
	lectures: CreateCourseByInstructorSectionLectureResponseDTO[];
	lecturesCount: number;
	lecturesDuration: number;
	order: number;
}

interface CreateCourseByInstructorResponseDTO {
	id: string;
	status: CourseStatuses;
	title: string;
	description: string;
	category: string;
	rating: CreateCourseByInstructorRatingResponseDTO | null;
	totalStudents: number;
	creators: CreateCourseByInstructorCreatorResponseDTO[];
	lastUpdatedOn: Date;
	languages: CourseLanguages[];
	subtitles: CourseSubtitles[];
	materialsAndOffers: string[];
	price: CreateCourseByInstructorPriceResponseDTO;
	image: string;
	sections: CreateCourseByInstructorSectionResponseDTO[];
	totalSectionsCount: number;
	totalLecturesCount: number;
	totalDuration: number;
}


export {
	CreateCourseByInstructorPriceResponseDTO,
	CreateCourseByInstructorCreatorResponseDTO,
	CreateCourseByInstructorRatingResponseDTO,
	CreateCourseByInstructorSectionLectureSubtitleResponseDTO,
	CreateCourseByInstructorSectionLectureResponseDTO,
	CreateCourseByInstructorSectionResponseDTO,
	CreateCourseByInstructorResponseDTO
};