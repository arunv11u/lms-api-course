import { ObjectId } from "mongodb";
import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { CourseEntity } from "../../domain";
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
}