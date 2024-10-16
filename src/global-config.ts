import { CartFactory } from "./cart/factory";
import { CourseFactory } from "./course";
import { InstructorFactory } from "./instructor";
import { StudentFactory } from "./student";
import { TokenFactory } from "./token";
import { TranscoderFactory } from "./transcoder";


const defaultRoutePath = "/";
const authorizationTokenName = "authorization";
const taxPercentage = 13;


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

function getTranscoderFactory() {
	return new TranscoderFactory();
}

function getCartFactory() {
	return new CartFactory();
}


export {
	defaultRoutePath,
	authorizationTokenName,
	taxPercentage,
	getCourseFactory,
	getStudentFactory,
	getInstructorFactory,
	getTokenFactory,
	getTranscoderFactory,
	getCartFactory
};
