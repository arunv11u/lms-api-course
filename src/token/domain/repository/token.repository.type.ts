import { Repository } from "../../../utils";


export abstract class TokenRepository extends Repository {

	abstract validateStudentAuthorizationToken(
		authorizationToken: string
	): Promise<{ id: string }>;

	abstract validateInstructorAuthorizationToken(
		authorizationToken: string
	): Promise<{ id: string }>;
}