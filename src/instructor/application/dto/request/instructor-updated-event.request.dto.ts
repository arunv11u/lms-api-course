import { InstructorUpdatedEventRequestDTO } from "./instructor-updated-event.request.dto.type";


class InstructorUpdatedEventRequestDTOImpl implements 
	InstructorUpdatedEventRequestDTO {
	email: string;
	firstName: string;
	id: string;
	lastName: string;
	profilePicture: string | null = null;
	userId: string;
	version: number;
}

export {
	InstructorUpdatedEventRequestDTOImpl
};