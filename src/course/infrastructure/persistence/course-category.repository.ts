import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { CourseCategoryORMEntity } from "./course-category.orm-entity";


export class CourseCategoryRepositoryImpl {
	private _collectionName = "course-categories";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async getAll(): Promise<string[]> {
		const courseCategoriesORMEntity = await this._mongodbRepository
			.find<CourseCategoryORMEntity>(
				this._collectionName,
				{}
			);

		const courseCategories = courseCategoriesORMEntity
			.map(courseCategory => courseCategory.category);

		return courseCategories;
	}
}