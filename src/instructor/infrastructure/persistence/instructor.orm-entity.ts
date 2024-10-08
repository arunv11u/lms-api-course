


export class InstructorORMEntity {
	_id: string;
	userId: string;
	firstName: string;
	lastName: string;
	designation: string | null = null;
	profilePicture: string | null = null;
	email: string;
	version: number;
}