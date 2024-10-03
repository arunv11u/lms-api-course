import { CourseFactory } from "./course";
import { InstructorFactory } from "./instructor";
import { StudentFactory } from "./student";
import { TokenFactory } from "./token";


const defaultRoutePath = "/";
const authorizationTokenName = "authorization";


function getCourseFactory() {
	return new CourseFactory();
}

function getStudentFactory() {
	return new StudentFactory();
}

function getInstructorFactory() {
	return new InstructorFactory();
}

function getTokenFactory() {
	return new TokenFactory();
}

export {
	defaultRoutePath,
	authorizationTokenName,
	getCourseFactory,
	getStudentFactory,
	getInstructorFactory,
	getTokenFactory
};
