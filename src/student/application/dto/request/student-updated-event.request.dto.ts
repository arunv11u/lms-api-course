import { StudentUpdatedEventRequestDTO } from "./student-updated-event.request.dto.type";


class StudentUpdatedEventRequestDTOImpl implements 
	StudentUpdatedEventRequestDTO {
	email: string;
	firstName: string;
	id: string;
	lastName: string;
	profilePicture: string | null = null;
	userId: string;
	version: number;
}

export {
	StudentUpdatedEventRequestDTOImpl
};