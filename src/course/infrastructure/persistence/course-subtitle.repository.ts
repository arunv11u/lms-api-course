import { ObjectId } from "mongodb";
import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { CourseEntity } from "../../domain";
import { CourseSubtitleORMEntity } from "./course-subtitle.orm-entity";



export class CourseSubtitleRepositoryImpl {
	private _collectionName = "course-subtitles";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async addSubtitlesByInstructor(
		courseEntity: CourseEntity,
		instructorId: string
	): Promise<void> {
		const courseSubtitlesORMEntity = courseEntity.subtitles
			.map<CourseSubtitleORMEntity>(subtitle => ({
				_id: new ObjectId(),
				course: new ObjectId(courseEntity.id),
				createdBy: instructorId,
				creationDate: new Date(),
				isDeleted: false,
				lastModifiedBy: instructorId,
				lastModifiedDate: new Date(),
				subtitle: subtitle,
				version: 1
			}));

		await this._mongodbRepository.addRange<CourseSubtitleORMEntity>(
			this._collectionName,
			courseSubtitlesORMEntity
		);
	}
}