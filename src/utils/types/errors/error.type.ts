
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
	languageIsInvalidFor2LetterIsoCode = "LANGUAGE_IS_INVALID_FOR_2_LETTER_ISO_CODE",
	courseTitleAlreadyExists = "COURSE_TITLE_ALREADY_EXISTS",
	courseCategoryRequired = "COURSE_CATEGORY_REQUIRED",
	courseDescriptionRequired = "COURSE_DESCRIPTION_REQUIRED",
	courseImageRequired = "COURSE_IMAGE_REQUIRED",
	courseLanguagesRequired = "COURSE_LANGUAGES_REQUIRED",
	courseLearningsRequired = "COURSE_LEARNINGS_REQUIRED",
	courseMaterialsAndOffersRequired = "COURSE_MATERIALS_AND_OFFERS_REQUIRED",
	coursePriceRequired = "COURSE_PRICE_REQUIRED",
	courseSectionsRequired = "COURSE_SECTIONS_REQUIRED",
	courseSubtitlesRequired = "COURSE_SUBTITLES_REQUIRED",
	courseTitleRequired = "COURSE_TITLE_REQUIRED",
	courseLanguagesTypeArray = "COURSE_LANGUAGES_TYPE_ARRAY",
	courseLanguagesElementTypeString = "COURSE_LANGUAGES_ELEMENT_TYPE_STRING",
	courseLearningsTypeArray = "COURSE_LEARNINGS_TYPE_ARRAY",
	courseLearningsElementTypeString = "COURSE_LEARNINGS_ELEMENT_TYPE_STRING",
	courseMaterialsAndOffersTypeArray = "COURSE_MATERIALS_AND_OFFERS_TYPE_ARRAY",
	courseMaterialsAndOffersElementTypeString = "COURSE_MATERIALS_AND_OFFERS_ELEMENT_TYPE_STRING",
	coursePriceCurrencyRequired = "COURSE_PRICE_CURRENCY_REQUIRED",
	coursePriceValueRequired = "COURSE_PRICE_VALUE_REQUIRED",
	courseNotFound = "COURSE_NOT_FOUND",
	courseIdRequired = "COURSE_ID_REQUIRED",
	cartNotFound = "CART_NOT_FOUND",
	cartCourseAlreadyExists = "CART_COURSE_ALREADY_EXISTS",
	cartCourseNotFound = "CART_COURSE_NOT_FOUND",
	cartEmpty = "CART_EMPTY",
	cartCheckoutCancelUrlRequired = "CART_CHECKOUT_CANCEL_URL_REQUIRED",
	cartCheckoutSuccessUrlRequired = "CART_CHECKOUT_SUCCESS_URL_REQUIRED"
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
