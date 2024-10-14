import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseStatuses,
	CourseSubtitles
} from "../../../domain";


interface ExploreACoursePriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

interface ExploreACourseCreatorResponseDTO {
	firstName: string;
	lastName: string;
	profilePicture: string | null;
	designation: string | null;
}

interface ExploreACourseRatingResponseDTO {
	value: number;
	totalCount: number;
}

interface ExploreACourseSectionLectureSubtitleResponseDTO {
	language: CourseSubtitles;
	url: string;
}

interface ExploreACourseSectionLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	thumbnail: string | null;
	order: number;
}

interface ExploreACourseSectionResponseDTO {
	id: string;
	title: string;
	lectures: ExploreACourseSectionLectureResponseDTO[];
	lecturesCount: number;
	lecturesDuration: number;
	order: number;
}

interface ExploreACourseResponseDTO {
	id: string;
	status: CourseStatuses;
	title: string;
	description: string;
	category: string;
	rating: ExploreACourseRatingResponseDTO | null;
	totalStudents: number;
	creators: ExploreACourseCreatorResponseDTO[];
	lastUpdatedOn: Date;
	languages: CourseLanguages[];
	subtitles: CourseSubtitles[];
	materialsAndOffers: string[];
	price: ExploreACoursePriceResponseDTO;
	image: string;
	sections: ExploreACourseSectionResponseDTO[];
	totalSectionsCount: number;
	totalLecturesCount: number;
	totalDuration: number;
}


export {
	ExploreACoursePriceResponseDTO,
	ExploreACourseCreatorResponseDTO,
	ExploreACourseRatingResponseDTO,
	ExploreACourseSectionLectureSubtitleResponseDTO,
	ExploreACourseSectionLectureResponseDTO,
	ExploreACourseSectionResponseDTO,
	ExploreACourseResponseDTO
};