

class InstructorUpdatedEventValueObject {
	id: string;
	userId: string;
	firstName: string;
	lastName: string;
	profilePicture: string | null = null;
	email: string;
	version: number;
}

export {
	InstructorUpdatedEventValueObject
};