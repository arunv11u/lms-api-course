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

	async updateCourseMaterialsAndOffersByInstructor(
		oldCourse: CourseEntity,
		course: CourseEntity,
		instructorId: string
	) {
		const oldCourseMaterialsAndOffersMap =
			new Set<string>(oldCourse.materialsAndOffers);
		const courseMaterialsAndOffersMap =
			new Set<string>(course.materialsAndOffers);
		const materialsAndOffersToBeDeleted: string[] = [];
		const materialsAndOffersToBeAdded: string[] = [];

		oldCourse.materialsAndOffers.forEach(materialAndOffer => {
			if (!courseMaterialsAndOffersMap.has(materialAndOffer))
				materialsAndOffersToBeDeleted.push(materialAndOffer);
		});

		course.materialsAndOffers.forEach(materialAndOffer => {
			if (!oldCourseMaterialsAndOffersMap.has(materialAndOffer))
				materialsAndOffersToBeAdded.push(materialAndOffer);
		});

		if(materialsAndOffersToBeDeleted.length)
			await this._deleteCourseMaterialsAndOffers(
				new ObjectId(course.id),
				materialsAndOffersToBeDeleted
			);

		if(materialsAndOffersToBeAdded.length)
			await this._addCourseMaterialsAndOffers(
				new ObjectId(course.id),
				materialsAndOffersToBeAdded,
				instructorId
			);
	}

	private async _deleteCourseMaterialsAndOffers(
		courseId: ObjectId,
		materialsAndOffers: string[]
	) {
		await this._mongodbRepository
			.removeRange<CourseMaterialAndOfferORMEntity>(
				this._collectionName,
				{
					course: courseId,
					materialAndOffer: { $in: materialsAndOffers }
				}
			);
	}

	private async _addCourseMaterialsAndOffers(
		courseId: ObjectId,
		materialsAndOffers: string[],
		instructorId: string
	) {
		const courseMaterialsAndOffersORMEntity = materialsAndOffers
			.map<CourseMaterialAndOfferORMEntity>(materialAndOffer => ({
				_id: new ObjectId(),
				course: courseId,
				createdBy: instructorId,
				creationDate: new Date(),
				isDeleted: false,
				materialAndOffer: materialAndOffer,
				lastModifiedBy: instructorId,
				lastModifiedDate: new Date(),
				version: 1
			}));

		await this._mongodbRepository.addRange<CourseMaterialAndOfferORMEntity>(
			this._collectionName,
			courseMaterialsAndOffersORMEntity
		);
	}
}