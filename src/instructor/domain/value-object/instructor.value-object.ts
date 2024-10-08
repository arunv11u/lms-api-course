

class InstructorValueObject {
	id: string;
	userId: string;
	firstName: string;
	lastName: string;
	designation: string | null;
	profilePicture: string | null = null;
	email: string;
	version: number;
}

export {
	InstructorValueObject
};