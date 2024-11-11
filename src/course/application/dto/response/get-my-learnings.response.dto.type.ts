import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseStatuses,
	CourseSubtitles
} from "../../../domain";


interface GetMyLearningsPriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

interface GetMyLearningsCreatorResponseDTO {
	firstName: string;
	lastName: string;
	profilePicture: string | null;
	designation: string | null;
}

interface GetMyLearningsRatingResponseDTO {
	value: number;
	totalCount: number;
}

interface GetMyLearningsSectionLectureSubtitleResponseDTO {
	language: CourseSubtitles;
	url: string;
}

interface GetMyLearningsSectionLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	thumbnail: string | null;
	order: number;
	watchDuration: number;
}

interface GetMyLearningsSectionResponseDTO {
	id: string;
	title: string;
	lectures: GetMyLearningsSectionLectureResponseDTO[];
	lecturesCount: number;
	lecturesDuration: number;
	order: number;
}

interface GetMyLearningsLastViewedLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	thumbnail: string | null;
	order: number;
	watchDuration: number;
}

interface GetMyLearningsResponseDTO {
	id: string;
	status: CourseStatuses;
	title: string;
	description: string;
	category: string;
	rating: GetMyLearningsRatingResponseDTO | null;
	totalStudents: number;
	creators: GetMyLearningsCreatorResponseDTO[];
	lastUpdatedOn: Date;
	languages: CourseLanguages[];
	subtitles: CourseSubtitles[];
	materialsAndOffers: string[];
	price: GetMyLearningsPriceResponseDTO;
	image: string;
	sections: GetMyLearningsSectionResponseDTO[];
	totalSectionsCount: number;
	totalLecturesCount: number;
	totalDuration: number;
	lastViewedLecture: GetMyLearningsLastViewedLectureResponseDTO | null;
}


export {
	GetMyLearningsPriceResponseDTO,
	GetMyLearningsCreatorResponseDTO,
	GetMyLearningsRatingResponseDTO,
	GetMyLearningsSectionLectureSubtitleResponseDTO,
	GetMyLearningsSectionLectureResponseDTO,
	GetMyLearningsSectionResponseDTO,
	GetMyLearningsLastViewedLectureResponseDTO,
	GetMyLearningsResponseDTO
};