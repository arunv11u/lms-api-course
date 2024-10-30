/* eslint-disable max-classes-per-file */
import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseStatuses,
	CourseSubtitles
} from "../../../domain";
import {
	GetMyLearningsCreatorResponseDTO,
	GetMyLearningsPriceResponseDTO,
	GetMyLearningsRatingResponseDTO,
	GetMyLearningsResponseDTO,
	GetMyLearningsSectionLectureResponseDTO,
	GetMyLearningsSectionLectureSubtitleResponseDTO,
	GetMyLearningsSectionResponseDTO
} from "./get-my-learnings.response.dto.type";


class GetMyLearningsPriceResponseDTOImpl implements
	GetMyLearningsPriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

class GetMyLearningsCreatorResponseDTOImpl implements
	GetMyLearningsCreatorResponseDTO {
	firstName: string;
	lastName: string;
	profilePicture: string | null = null;
	designation: string | null = null;
}

class GetMyLearningsRatingResponseDTOImpl implements
	GetMyLearningsRatingResponseDTO {
	value: number;
	totalCount: number;
}

class GetMyLearningsSectionLectureSubtitleResponseDTOImpl implements
	GetMyLearningsSectionLectureSubtitleResponseDTO {
	language: CourseSubtitles;
	url: string;
}

class GetMyLearningsSectionLectureResponseDTOImpl implements
	GetMyLearningsSectionLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	link: string;
	thumbnail: string | null = null;
	order: number;
}

class GetMyLearningsSectionResponseDTOImpl implements
	GetMyLearningsSectionResponseDTO {
	id: string;
	title: string;
	lectures: GetMyLearningsSectionLectureResponseDTO[] = [];
	lecturesCount: number;
	lecturesDuration: number;
	order: number;
}

class GetMyLearningsResponseDTOImpl implements
	GetMyLearningsResponseDTO {
	id: string;
	status: CourseStatuses;
	title: string;
	description: string;
	category: string;
	rating: GetMyLearningsRatingResponseDTO | null = null;
	totalStudents: number;
	creators: GetMyLearningsCreatorResponseDTO[] = [];
	lastUpdatedOn: Date;
	languages: CourseLanguages[] = [];
	subtitles: CourseSubtitles[] = [];
	materialsAndOffers: string[] = [];
	price = new GetMyLearningsPriceResponseDTOImpl();
	image: string;
	sections: GetMyLearningsSectionResponseDTO[] = [];
	totalSectionsCount: number;
	totalLecturesCount: number;
	totalDuration: number;
}


export {
	GetMyLearningsPriceResponseDTOImpl,
	GetMyLearningsCreatorResponseDTOImpl,
	GetMyLearningsRatingResponseDTOImpl,
	GetMyLearningsSectionLectureSubtitleResponseDTOImpl,
	GetMyLearningsSectionLectureResponseDTOImpl,
	GetMyLearningsSectionResponseDTOImpl,
	GetMyLearningsResponseDTOImpl
};