import {
	CourseLanguages,
	CoursePriceCurrencies,
	CourseStatuses,
	CourseSubtitles
} from "../../../domain";


interface UpdateLectureWatchDurationPriceResponseDTO {
	currency: CoursePriceCurrencies;
	value: number;
}

interface UpdateLectureWatchDurationCreatorResponseDTO {
	firstName: string;
	lastName: string;
	profilePicture: string | null;
	designation: string | null;
}

interface UpdateLectureWatchDurationRatingResponseDTO {
	value: number;
	totalCount: number;
}

interface UpdateLectureWatchDurationSectionLectureSubtitleResponseDTO {
	language: CourseSubtitles;
	url: string;
}

interface UpdateLectureWatchDurationSectionLectureResponseDTO {
	id: string;
	title: string;
	description: string;
	duration: number;
	thumbnail: string | null;
	order: number;
}

interface UpdateLectureWatchDurationSectionResponseDTO {
	id: string;
	title: string;
	lectures: UpdateLectureWatchDurationSectionLectureResponseDTO[];
	lecturesCount: number;
	lecturesDuration: number;
	order: number;
}

interface UpdateLectureWatchDurationResponseDTO {
	id: string;
	status: CourseStatuses;
	title: string;
	description: string;
	category: string;
	rating: UpdateLectureWatchDurationRatingResponseDTO | null;
	totalStudents: number;
	creators: UpdateLectureWatchDurationCreatorResponseDTO[];
	lastUpdatedOn: Date;
	languages: CourseLanguages[];
	subtitles: CourseSubtitles[];
	materialsAndOffers: string[];
	price: UpdateLectureWatchDurationPriceResponseDTO;
	image: string;
	sections: UpdateLectureWatchDurationSectionResponseDTO[];
	totalSectionsCount: number;
	totalLecturesCount: number;
	totalDuration: number;
}


export {
	UpdateLectureWatchDurationPriceResponseDTO,
	UpdateLectureWatchDurationCreatorResponseDTO,
	UpdateLectureWatchDurationRatingResponseDTO,
	UpdateLectureWatchDurationSectionLectureSubtitleResponseDTO,
	UpdateLectureWatchDurationSectionLectureResponseDTO,
	UpdateLectureWatchDurationSectionResponseDTO,
	UpdateLectureWatchDurationResponseDTO
};