

interface StudentUpdatedEventRequestDTO {
	id: string;
	userId: string;
	firstName: string;
	lastName: string;
	profilePicture: string | null;
	email: string;
	version: number;
}

export {
	StudentUpdatedEventRequestDTO
};