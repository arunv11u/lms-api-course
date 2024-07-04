import { CourseFactory } from "./course";


const defaultRoutePath = "/";


function getCourseFactory() {
	return new CourseFactory();
}


export {
	defaultRoutePath,
	getCourseFactory
};
