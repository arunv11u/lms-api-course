import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { ErrorCodes, GenericError } from "../../../utils";
import {
	StudentCreatedEventValueObject,
	StudentObject,
	StudentRepository,
	StudentUpdatedEventValueObject,
	StudentValueObject
} from "../../domain";
import { StudentORMEntity } from "./student.orm-entity";



export class StudentRepositoryImpl implements 
	StudentRepository, StudentObject {
	private _collectionName = "students";
	private _mongodbRepository: MongoDBRepository | null = null;

	set mongoDBRepository(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async get(id: string): Promise<StudentValueObject | null> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const student = await this._mongodbRepository
			.get<StudentORMEntity>(this._collectionName, id);

		if (!student) return null;

		const studentValueObject =
			new StudentValueObject();
		studentValueObject.email = student.email;
		studentValueObject.firstName = student.firstName;
		studentValueObject.id = student._id;
		studentValueObject.lastName = student.lastName;
		studentValueObject.profilePicture = student.profilePicture;
		studentValueObject.userId = student.userId;
		studentValueObject.version = student.version;

		return studentValueObject;
	}

	async saveStudentFromMessagingQueue(
		studentCreatedEvent: StudentCreatedEventValueObject
	): Promise<void> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const studentORMEntity = new StudentORMEntity();
		studentORMEntity._id = studentCreatedEvent.id;
		studentORMEntity.email = studentCreatedEvent.email;
		studentORMEntity.firstName = studentCreatedEvent.firstName;
		studentORMEntity.lastName = studentCreatedEvent.lastName;
		studentORMEntity.userId = studentCreatedEvent.userId;
		studentORMEntity.version = 1;

		await this._mongodbRepository
			.add<StudentORMEntity>(this._collectionName, studentORMEntity);
	}

	async updateStudentFromMessagingQueue(
		studentUpdatedEventValueObject: StudentUpdatedEventValueObject
	): Promise<void> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const studentORMEntity = new StudentORMEntity();
		studentORMEntity._id = studentUpdatedEventValueObject.id;
		studentORMEntity.email = studentUpdatedEventValueObject.email;
		studentORMEntity.firstName = studentUpdatedEventValueObject.firstName;
		studentORMEntity.lastName = studentUpdatedEventValueObject.lastName;
		studentORMEntity.profilePicture =
			studentUpdatedEventValueObject.profilePicture;
		studentORMEntity.userId = studentUpdatedEventValueObject.userId;
		studentORMEntity.version = studentUpdatedEventValueObject.version;

		await this._mongodbRepository
			.update<StudentORMEntity>(
				this._collectionName,
				{ _id: studentUpdatedEventValueObject.id },
				{
					$set: studentORMEntity
				}
			);
	}

	async getStudentProfileByUserId(userId: string): Promise<{ id: string }> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const studentORMEntity = await this._mongodbRepository
			.findOne<StudentORMEntity>(
				this._collectionName,
				{
					userId: userId
				}
			);
		if (!studentORMEntity)
			throw new GenericError({
				code: ErrorCodes.studentNotFound,
				error: new Error("Student not found"),
				errorCode: 404
			});

		return { id: studentORMEntity._id };
	}
}