import { CartFactory } from "./cart";
import { CourseFactory } from "./course";
import { InstructorFactory } from "./instructor";
import { OrderFactory } from "./order";
import { PaymentFactory } from "./payment";
import { StudentFactory } from "./student";
import { TokenFactory } from "./token";
import { TranscoderFactory } from "./transcoder";


const defaultRoutePath = "/";
const authorizationTokenName = "authorization";
const taxPercentage = 13;
const courseSocketNamespace = "/course";


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

function getOrderFactory() {
	return new OrderFactory();
}

function getPaymentFactory() {
	return new PaymentFactory();
}


export {
	defaultRoutePath,
	authorizationTokenName,
	taxPercentage,
	courseSocketNamespace,
	getCourseFactory,
	getStudentFactory,
	getInstructorFactory,
	getTokenFactory,
	getTranscoderFactory,
	getCartFactory,
	getOrderFactory,
	getPaymentFactory
};
