import { ObjectId } from "mongodb";
import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { CourseEntity, CourseLanguages } from "../../domain";
import { CourseLanguageORMEntity } from "./course-language.orm-entity";



export class CourseLanguageRepositoryImpl {
	private _collectionName = "course-languages";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async addLanguagesByInstructor(
		courseEntity: CourseEntity,
		instructorId: string
	): Promise<void> {

		const courseLanguagesORMEntity = courseEntity.languages
			.map<CourseLanguageORMEntity>(language => ({
				_id: new ObjectId(),
				course: new ObjectId(courseEntity.id),
				createdBy: instructorId,
				creationDate: new Date(),
				isDeleted: false,
				language: language,
				lastModifiedBy: instructorId,
				lastModifiedDate: new Date(),
				version: 1
			}));

		await this._mongodbRepository.addRange(
			this._collectionName,
			courseLanguagesORMEntity
		);
	}

	async updateLanguagesByInstructor(
		oldCourse: CourseEntity,
		course: CourseEntity,
		instructorId: string
	): Promise<void> {
		const oldCourseLanguagesMap =
			new Set<CourseLanguages>(oldCourse.languages);
		const courseLanguagesMap = new Set<CourseLanguages>(course.languages);
		const languagesToBeDeleted: CourseLanguages[] = [];
		const languagesToBeAdded: CourseLanguages[] = [];

		oldCourse.languages.forEach(language => {
			if (!courseLanguagesMap.has(language))
				languagesToBeDeleted.push(language);
		});

		course.languages.forEach(language => {
			if (!oldCourseLanguagesMap.has(language))
				languagesToBeAdded.push(language);
		});

		if(languagesToBeDeleted.length)
			await this._deleteLanguages(
				new ObjectId(course.id),
				languagesToBeDeleted
			);

		if(languagesToBeAdded.length)
			await this._addLanguages(
				new ObjectId(course.id),
				languagesToBeAdded,
				instructorId
			);
	}

	private async _deleteLanguages(
		courseId: ObjectId,
		languages: CourseLanguages[]
	) {
		await this._mongodbRepository.removeRange<CourseLanguageORMEntity>(
			this._collectionName,
			{
				course: courseId,
				language: { $in: languages }
			}
		);
	}

	private async _addLanguages(
		courseId: ObjectId,
		languages: CourseLanguages[],
		instructorId: string
	) {
		const courseLanguagesORMEntity = languages
			.map<CourseLanguageORMEntity>(language => ({
				_id: new ObjectId(),
				course: courseId,
				createdBy: instructorId,
				creationDate: new Date(),
				isDeleted: false,
				language: language,
				lastModifiedBy: instructorId,
				lastModifiedDate: new Date(),
				version: 1
			}));

		await this._mongodbRepository.addRange<CourseLanguageORMEntity>(
			this._collectionName,
			courseLanguagesORMEntity
		);
	}
}