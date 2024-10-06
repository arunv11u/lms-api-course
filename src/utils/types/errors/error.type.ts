
export enum ErrorCodes {
	clientError = "CLIENT_ERROR",
	unauthorized = "UNAUTHORIZED",
	paymentRequired = "PAYMENT_REQUIRED",
	forbidden = "FORBIDDEN",
	notFound = "NOT_FOUND",
	conflict = "CONFLICT",
	tooManyRequests = "TOO_MANY_REQUESTS",
	firebaseAppTokenConnection = "FIREBASE_APP_TOKEN_CONNECTION",
	socketConnection = "SOCKET_CONNECTION",
	invalidFactoryObject = "INV_FACTORY_OBJ",
	mongoDBRepositoryDoesNotExist = "MONGODB_REPOSITORY_DOES_NOT_EXIST",
	invalidInput = "INV_INPUT",
	noUseCase = "NO_USE_CASE",
	invalidEnvironment = "INV_ENVIRONMENT",
	invalidOrigin = "INV_ORIGIN",
	userAlreadyExists = "USR_ALREADY_EXISTS",
	passwordDoesnotMatch = "PASSWORD_DOES_NOT_MATCH",
	userNotFound = "USR_NOT_EXISTS",
	firebaseInvalidAppToken = "FIREBASE_INVALID_APP_TOKEN",
	invalidCredentials = "INVALID_CREDENTIALS",
	invalidPassword = "INV_PASSWORD",
	invalidRefreshToken = "INVALID_REFRESH_TOKEN",
	internalError = "INTERNAL_ERROR",
	messageEmptyInMessagingListener = "MESSAGE_EMPTY_IN_MESSAGING_LISTENER",
	studentNotFound = "STUDENT_NOT_FOUND",
	studentVersionDidNotMatch = "STUDENT_VERSION_DID_NOT_MATCH",
	instructorVersionDidNotMatch = "INSTRUCTOR_VERSION_DID_NOT_MATCH",
	instructorNotFound = "INSTRUCTOR_NOT_FOUND",
	invalidAuthorizationToken = "INVALID_AUTHORIZATION_TOKEN",
	courseImageMimeTypeRequired = "COURSE_IMAGE_MIME_TYPEE_REQUIRED",
	videoTranscoderConnectionError = "VIDEO_TRANSCODER_CONNECTION",
	hlsDurationFromUrl = "HLS_DURATION_FROM_URL",
	languageIsInvalidFor2LetterIsoCode = "LANGUAGE_IS_INVALID_FOR_2_LETTER_ISO_CODE"
}

export interface FormattedError {
	errors: ErrorObject[];
}


export interface ErrorObject {
	code: string;
	message: string;
	field?: string;
}


export interface GenericErrorObject {
	code: ErrorCodes;
	error: Error;
	errorCode: number;
}
