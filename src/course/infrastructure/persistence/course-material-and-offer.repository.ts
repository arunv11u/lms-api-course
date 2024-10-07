import { ObjectId } from "mongodb";
import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { CourseEntity } from "../../domain";
import { CourseMaterialAndOfferORMEntity } from "./course-material-and-offer.orm-entity";



export class CourseMaterialAndOfferRepositoryImpl {
	private _collectionName = "course-materials-and-offers";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async addCourseMaterialsAndOffersByInstructor(
		courseEntity: CourseEntity,
		instructorId: string
	): Promise<void> {
		const courseMaterialsAndOffersORMEntity = courseEntity
			.materialsAndOffers
			.map<CourseMaterialAndOfferORMEntity>(materialAndOffer => ({
				_id: new ObjectId(),
				course: new ObjectId(courseEntity.id),
				createdBy: instructorId,
				creationDate: new Date(),
				isDeleted: false,
				lastModifiedBy: instructorId,
				lastModifiedDate: new Date(),
				materialAndOffer: materialAndOffer,
				version: 1
			}));

		await this._mongodbRepository
			.addRange<CourseMaterialAndOfferORMEntity>(
				this._collectionName,
				courseMaterialsAndOffersORMEntity
			);
	}
}