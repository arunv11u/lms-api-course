

interface InstructorUpdatedEventRequestDTO {
	id: string;
	userId: string;
	firstName: string;
	lastName: string;
	profilePicture: string | null;
	email: string;
	version: number;
}

export {
	InstructorUpdatedEventRequestDTO
};