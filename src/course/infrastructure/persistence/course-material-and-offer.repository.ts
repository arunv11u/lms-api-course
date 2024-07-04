import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { CourseMaterialAndOfferORMEntity } from "./course-material-and-offer.orm-entity";
import { ObjectId } from "mongodb";



export class CourseMaterialAndOfferRepositoryImpl {
	private _collectionName = "course-materials-and-offers";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async getAllWithCourseId(
		courseId: string
	): Promise<string[]> {
		const courseMaterialsAndOffersORMEntity = await this._mongodbRepository
			.find<CourseMaterialAndOfferORMEntity>(
				this._collectionName,
				{
					course: new ObjectId(courseId)
				}
			);

		const courseMaterialsAndOffers = courseMaterialsAndOffersORMEntity
			.map(
				(courseMaterialAndOfferORMEntity) => {
					return courseMaterialAndOfferORMEntity.materialAndOffer;
				});

		return courseMaterialsAndOffers;
	}
}