/* eslint-disable max-lines */
import { Authorization } from "@arunvaradharajalu/common.learning-management-system-api.authorization";
import {
	ErrorCodes,
	GenericError,
	getAuthorization
} from "../../../utils";
import { TokenObject, TokenRepository } from "../../domain";
import { StudentFactory, StudentRepository } from "../../../student";
import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { InstructorFactory, InstructorRepository } from "../../../instructor";
import { getInstructorFactory, getStudentFactory } from "../../../global-config";


export class TokenRepositoryImpl implements TokenRepository, TokenObject {
	private _authorization: Authorization;
	private _studentFactory: StudentFactory;
	private _instructorFactory: InstructorFactory;
	private _mongodbRepository: MongoDBRepository | null = null;

	constructor() {
		this._authorization = getAuthorization();
		this._studentFactory = getStudentFactory();
		this._instructorFactory = getInstructorFactory();
	}

	set mongoDBRepository(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async validateStudentAuthorizationToken(
		authorizationToken: string
	): Promise<{ id: string }> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const payload = await this._authorization
			.validate(authorizationToken);

		const studentRepository = this._studentFactory.make("StudentRepository") as StudentRepository;
		studentRepository.mongoDBRepository = this._mongodbRepository;

		const studentEntity = await studentRepository
			.getStudentProfileByUserId(payload.user);

		return studentEntity;
	}

	async validateInstructorAuthorizationToken(
		authorizationToken: string
	): Promise<{ id: string }> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const payload = await this._authorization
			.validate(authorizationToken);

		const instructorRepository = this._instructorFactory.make("InstructorRepository") as InstructorRepository;
		instructorRepository.mongoDBRepository = this._mongodbRepository;

		const instructorEntity = await instructorRepository
			.getInstructorProfileByUserId(payload.user);

		return instructorEntity;
	}
}