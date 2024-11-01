/* eslint-disable max-classes-per-file */
import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseStatuses,
	CourseSubtitles
} from "../../../domain";
import {
	UpdateLectureWatchDurationCreatorResponseDTO,
	UpdateLectureWatchDurationPriceResponseDTO,
	UpdateLectureWatchDurationRatingResponseDTO,
	UpdateLectureWatchDurationResponseDTO,
	UpdateLectureWatchDurationSectionLectureResponseDTO,
	UpdateLectureWatchDurationSectionLectureSubtitleResponseDTO,
	UpdateLectureWatchDurationSectionResponseDTO
} from "./update-lecture-watch-duration.response.dto.type";


class UpdateLectureWatchDurationPriceResponseDTOImpl implements
	UpdateLectureWatchDurationPriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

class UpdateLectureWatchDurationCreatorResponseDTOImpl implements
	UpdateLectureWatchDurationCreatorResponseDTO {
	firstName: string;
	lastName: string;
	profilePicture: string | null = null;
	designation: string | null = null;
}

class UpdateLectureWatchDurationRatingResponseDTOImpl implements
	UpdateLectureWatchDurationRatingResponseDTO {
	value: number;
	totalCount: number;
}

class UpdateLectureWatchDurationSectionLectureSubtitleResponseDTOImpl implements
	UpdateLectureWatchDurationSectionLectureSubtitleResponseDTO {
	language: CourseSubtitles;
	url: string;
}

class UpdateLectureWatchDurationSectionLectureResponseDTOImpl implements
	UpdateLectureWatchDurationSectionLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	link: string;
	thumbnail: string | null = null;
	order: number;
}

class UpdateLectureWatchDurationSectionResponseDTOImpl implements
	UpdateLectureWatchDurationSectionResponseDTO {
	id: string;
	title: string;
	lectures: UpdateLectureWatchDurationSectionLectureResponseDTO[] = [];
	lecturesCount: number;
	lecturesDuration: number;
	order: number;
}

class UpdateLectureWatchDurationResponseDTOImpl implements
	UpdateLectureWatchDurationResponseDTO {
	id: string;
	status: CourseStatuses;
	title: string;
	description: string;
	category: string;
	rating: UpdateLectureWatchDurationRatingResponseDTO | null = null;
	totalStudents: number;
	creators: UpdateLectureWatchDurationCreatorResponseDTO[] = [];
	lastUpdatedOn: Date;
	languages: CourseLanguages[] = [];
	subtitles: CourseSubtitles[] = [];
	materialsAndOffers: string[] = [];
	price = new UpdateLectureWatchDurationPriceResponseDTOImpl();
	image: string;
	sections: UpdateLectureWatchDurationSectionResponseDTO[] = [];
	totalSectionsCount: number;
	totalLecturesCount: number;
	totalDuration: number;
}


export {
	UpdateLectureWatchDurationPriceResponseDTOImpl,
	UpdateLectureWatchDurationCreatorResponseDTOImpl,
	UpdateLectureWatchDurationRatingResponseDTOImpl,
	UpdateLectureWatchDurationSectionLectureSubtitleResponseDTOImpl,
	UpdateLectureWatchDurationSectionLectureResponseDTOImpl,
	UpdateLectureWatchDurationSectionResponseDTOImpl,
	UpdateLectureWatchDurationResponseDTOImpl
};