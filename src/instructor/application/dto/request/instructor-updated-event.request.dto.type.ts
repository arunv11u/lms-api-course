

interface InstructorUpdatedEventRequestDTO {
	id: string;
	userId: string;
	firstName: string;
	lastName: string;
	designation: string | null;
	profilePicture: string | null;
	email: string;
	version: number;
}

export {
	InstructorUpdatedEventRequestDTO
};