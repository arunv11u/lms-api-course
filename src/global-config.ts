import { CourseFactory } from "./course";
import { InstructorFactory } from "./instructor";
import { StudentFactory } from "./student";


const defaultRoutePath = "/";


function getCourseFactory() {
	return new CourseFactory();
}

function getStudentFactory() {
	return new StudentFactory();
}

function getInstructorFactory() {
	return new InstructorFactory();
}


export {
	defaultRoutePath,
	getCourseFactory,
	getStudentFactory,
	getInstructorFactory
};
