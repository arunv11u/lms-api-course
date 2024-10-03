import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { ErrorCodes, GenericError } from "../../../utils";
import {
	InstructorCreatedEventValueObject,
	InstructorObject,
	InstructorRepository,
	InstructorUpdatedEventValueObject
} from "../../domain";
import { InstructorORMEntity } from "./instructor.orm-entity";



export class InstructorRepositoryImpl implements 
	InstructorRepository, InstructorObject {
	private _collectionName = "instructors";
	private _mongodbRepository: MongoDBRepository | null = null;

	set mongoDBRepository(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async get(id: string): Promise<InstructorCreatedEventValueObject | null> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const instructor = await this._mongodbRepository
			.get<InstructorORMEntity>(this._collectionName, id);

		if (!instructor) return null;

		const instructorCreatedEventValueObject =
			new InstructorCreatedEventValueObject();
		instructorCreatedEventValueObject.email = instructor.email;
		instructorCreatedEventValueObject.firstName = instructor.firstName;
		instructorCreatedEventValueObject.id = instructor._id;
		instructorCreatedEventValueObject.lastName = instructor.lastName;
		instructorCreatedEventValueObject.userId = instructor.userId;
		instructorCreatedEventValueObject.version = instructor.version;

		return instructorCreatedEventValueObject;
	}

	async saveInstructorFromMessagingQueue(
		instructorCreatedEvent: InstructorCreatedEventValueObject
	): Promise<void> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const instructorORMEntity = new InstructorORMEntity();
		instructorORMEntity._id = instructorCreatedEvent.id;
		instructorORMEntity.email = instructorCreatedEvent.email;
		instructorORMEntity.firstName = instructorCreatedEvent.firstName;
		instructorORMEntity.lastName = instructorCreatedEvent.lastName;
		instructorORMEntity.userId = instructorCreatedEvent.userId;
		instructorORMEntity.version = 1;

		await this._mongodbRepository
			.add<InstructorORMEntity>(
				this._collectionName,
				instructorORMEntity
			);
	}

	async updateInstructorFromMessagingQueue(
		instructorUpdatedEventValueObject: InstructorUpdatedEventValueObject
	): Promise<void> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const instructorORMEntity = new InstructorORMEntity();
		instructorORMEntity._id = instructorUpdatedEventValueObject.id;
		instructorORMEntity.email = instructorUpdatedEventValueObject.email;
		instructorORMEntity.firstName =
			instructorUpdatedEventValueObject.firstName;
		instructorORMEntity.lastName =
			instructorUpdatedEventValueObject.lastName;
		instructorORMEntity.profilePicture =
			instructorUpdatedEventValueObject.profilePicture;
		instructorORMEntity.userId = instructorUpdatedEventValueObject.userId;
		instructorORMEntity.version = instructorUpdatedEventValueObject.version;

		await this._mongodbRepository
			.update<InstructorORMEntity>(
				this._collectionName,
				{ _id: instructorUpdatedEventValueObject.id },
				{
					$set: instructorORMEntity
				}
			);
	}

	async getInstructorProfileByUserId(
		userId: string
	): Promise<{ id: string }> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const instructorORMEntity = await this._mongodbRepository
			.findOne<InstructorORMEntity>(
				this._collectionName,
				{
					userId: userId
				}
			);
		if (!instructorORMEntity)
			throw new GenericError({
				code: ErrorCodes.instructorNotFound,
				error: new Error("Instructor not found"),
				errorCode: 404
			});

		return { id: instructorORMEntity._id };
	}
}