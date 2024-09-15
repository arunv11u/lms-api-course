import { StudentCreatedEventRequestDTO } from "./student-created-event.request.dto.type";


class StudentCreatedEventRequestDTOImpl implements 
	StudentCreatedEventRequestDTO {
	email: string;
	firstName: string;
	id: string;
	lastName: string;
	userId: string;
	version: number;
}

export {
	StudentCreatedEventRequestDTOImpl
};