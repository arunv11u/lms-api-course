import { CourseFactory } from "./course";
import { StudentFactory } from "./student";


const defaultRoutePath = "/";


function getCourseFactory() {
	return new CourseFactory();
}

function getStudentFactory() {
	return new StudentFactory();
}


export {
	defaultRoutePath,
	getCourseFactory,
	getStudentFactory
};
