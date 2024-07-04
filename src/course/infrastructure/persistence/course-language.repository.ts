import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { CourseLanguages } from "../../domain";
import { CourseLanguageORMEntity } from "./course-language.orm-entity";
import { ObjectId } from "mongodb";



export class CourseLanguageRepositoryImpl {
	private _collectionName = "course-languages";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async getAllWithCourseId(
		courseId: string
	): Promise<CourseLanguages[]> {
		const courseLanguagesORMEntity = await this._mongodbRepository
			.find<CourseLanguageORMEntity>(
				this._collectionName,
				{
					course: new ObjectId(courseId)
				}
			);

		const courseLanguages = courseLanguagesORMEntity
			.map(
				(courseLanguageORMEntity) => {
					return courseLanguageORMEntity.language;
				});

		return courseLanguages;
	}
}