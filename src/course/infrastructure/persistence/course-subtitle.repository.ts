import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { ObjectId } from "mongodb";
import { CourseSubtitles } from "../../domain";
import { CourseSubtitleORMEntity } from "./course-subtitle.orm-entity";



export class CourseSubtitleRepositoryImpl {
	private _collectionName = "course-subtitles";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async getAllWithCourseId(
		courseId: string
	): Promise<CourseSubtitles[]> {
		const subtitlesORMEntity = await this._mongodbRepository
			.find<CourseSubtitleORMEntity>(
				this._collectionName,
				{ course: new ObjectId(courseId) }
			);

		const subtitles = subtitlesORMEntity.map(subtitleORMEntity => {
			return subtitleORMEntity.subtitle;
		});

		return subtitles;
	}
}