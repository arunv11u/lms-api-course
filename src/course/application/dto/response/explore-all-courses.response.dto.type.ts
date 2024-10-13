import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseStatuses,
	CourseSubtitles
} from "../../../domain";


interface ExploreAllCoursesPriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

interface ExploreAllCoursesCreatorResponseDTO {
	firstName: string;
	lastName: string;
	profilePicture: string | null;
	designation: string | null;
}

interface ExploreAllCoursesRatingResponseDTO {
	value: number;
	totalCount: number;
}

interface ExploreAllCoursesSectionLectureSubtitleResponseDTO {
	language: CourseSubtitles;
	url: string;
}

interface ExploreAllCoursesSectionLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	thumbnail: string | null;
	order: number;
}

interface ExploreAllCoursesSectionResponseDTO {
	id: string;
	title: string;
	lectures: ExploreAllCoursesSectionLectureResponseDTO[];
	lecturesCount: number;
	lecturesDuration: number;
	order: number;
}

interface ExploreAllCoursesResponseDTO {
	id: string;
	status: CourseStatuses;
	title: string;
	description: string;
	category: string;
	rating: ExploreAllCoursesRatingResponseDTO | null;
	totalStudents: number;
	creators: ExploreAllCoursesCreatorResponseDTO[];
	lastUpdatedOn: Date;
	languages: CourseLanguages[];
	subtitles: CourseSubtitles[];
	materialsAndOffers: string[];
	price: ExploreAllCoursesPriceResponseDTO;
	image: string;
	sections: ExploreAllCoursesSectionResponseDTO[];
	totalSectionsCount: number;
	totalLecturesCount: number;
	totalDuration: number;
}


export {
	ExploreAllCoursesPriceResponseDTO,
	ExploreAllCoursesCreatorResponseDTO,
	ExploreAllCoursesRatingResponseDTO,
	ExploreAllCoursesSectionLectureSubtitleResponseDTO,
	ExploreAllCoursesSectionLectureResponseDTO,
	ExploreAllCoursesSectionResponseDTO,
	ExploreAllCoursesResponseDTO
};