import { ObjectId } from "mongodb";
import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { CourseEntity, CourseSubtitles } from "../../domain";
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

	async updateSubtitlesByInstructor(
		oldCourse: CourseEntity,
		course: CourseEntity,
		instructorId: string
	): Promise<void> {
		const oldCourseSubtitlesMap =
			new Set<CourseSubtitles>(oldCourse.subtitles);
		const courseSubtitlesMap = new Set<CourseSubtitles>(course.subtitles);
		const subtitlesToBeDeleted: CourseSubtitles[] = [];
		const subtitlesToBeAdded: CourseSubtitles[] = [];

		oldCourse.subtitles.forEach(subtitle => {
			if (!courseSubtitlesMap.has(subtitle))
				subtitlesToBeDeleted.push(subtitle);
		});

		course.subtitles.forEach(subtitle => {
			if (!oldCourseSubtitlesMap.has(subtitle))
				subtitlesToBeAdded.push(subtitle);
		});

		if(subtitlesToBeDeleted.length)
			await this._deleteSubtitles(
				new ObjectId(course.id),
				subtitlesToBeDeleted
			);

		if(subtitlesToBeAdded.length)
			await this._addSubtitles(
				new ObjectId(course.id),
				subtitlesToBeAdded,
				instructorId
			);
	}

	private async _deleteSubtitles(
		courseId: ObjectId,
		subtitles: CourseSubtitles[]
	) {
		await this._mongodbRepository.removeRange<CourseSubtitleORMEntity>(
			this._collectionName,
			{
				course: courseId,
				subtitle: { $in: subtitles }
			}
		);
	}

	private async _addSubtitles(
		courseId: ObjectId,
		subtitles: CourseSubtitles[],
		instructorId: string
	) {
		const courseSubtitlesORMEntity = subtitles
			.map<CourseSubtitleORMEntity>(subtitle => ({
				_id: new ObjectId(),
				course: courseId,
				createdBy: instructorId,
				creationDate: new Date(),
				isDeleted: false,
				subtitle: subtitle,
				lastModifiedBy: instructorId,
				lastModifiedDate: new Date(),
				version: 1
			}));

		await this._mongodbRepository.addRange<CourseSubtitleORMEntity>(
			this._collectionName,
			courseSubtitlesORMEntity
		);
	}
}