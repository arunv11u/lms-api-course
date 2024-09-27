import { InstructorCreatedEventRequestDTO } from "./instructor-created-event.request.dto.type";


class InstructorCreatedEventRequestDTOImpl implements
	InstructorCreatedEventRequestDTO {
	email: string;
	firstName: string;
	id: string;
	lastName: string;
	userId: string;
	version: number;
}

export {
	InstructorCreatedEventRequestDTOImpl
};