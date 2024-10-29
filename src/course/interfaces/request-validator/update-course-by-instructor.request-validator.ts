import { Request, Response, NextFunction } from "express";
import { authorizationTokenName } from "../../../global-config";
import { ArrayValidatorImpl, DataTypeValidatorImpl, ErrorCodes, GenericError } from "../../../utils";


function updateCourseByInstructorRequestValidator(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const dataTypeValidator = new DataTypeValidatorImpl();
	const arrayValidator = new ArrayValidatorImpl();

	if (!request.header(authorizationTokenName))
		throw new GenericError({
			code: ErrorCodes.invalidAuthorizationToken,
			error: new Error("Invalid authorization token"),
			errorCode: 400
		});

	if (!request.body.category)
		throw new GenericError({
			code: ErrorCodes.courseCategoryRequired,
			error: new Error("Course category is required"),
			errorCode: 400
		});

	if (!request.body.description)
		throw new GenericError({
			code: ErrorCodes.courseDescriptionRequired,
			error: new Error("Course description is required"),
			errorCode: 400
		});

	if (!request.body.image)
		throw new GenericError({
			code: ErrorCodes.courseImageRequired,
			error: new Error("Course image is required"),
			errorCode: 400
		});

	if (!request.body.languages)
		throw new GenericError({
			code: ErrorCodes.courseLanguagesRequired,
			error: new Error("Course languages are required"),
			errorCode: 400
		});

	if (!dataTypeValidator.checkFieldIsArray(request.body.languages))
		throw new GenericError({
			code: ErrorCodes.courseLanguagesTypeArray,
			error: new Error("Course languages type should be an array"),
			errorCode: 400
		});

	if (!arrayValidator.checkArrOfStr(request.body.languages))
		throw new GenericError({
			code: ErrorCodes.courseLanguagesElementTypeString,
			error: new Error("Course languages should be array of strings"),
			errorCode: 400
		});

	if (!request.body.learnings)
		throw new GenericError({
			code: ErrorCodes.courseLearningsRequired,
			error: new Error("Course learnings are required"),
			errorCode: 400
		});

	if (!dataTypeValidator.checkFieldIsArray(request.body.learnings))
		throw new GenericError({
			code: ErrorCodes.courseLearningsTypeArray,
			error: new Error("Course learnings type should be an array"),
			errorCode: 400
		});

	if (!arrayValidator.checkArrOfStr(request.body.learnings))
		throw new GenericError({
			code: ErrorCodes.courseLearningsElementTypeString,
			error: new Error("Course learnings should be array of strings"),
			errorCode: 400
		});

	if (!request.body.materialsAndOffers)
		throw new GenericError({
			code: ErrorCodes.courseMaterialsAndOffersRequired,
			error: new Error("Course materials and offers are required"),
			errorCode: 400
		});

	if (!dataTypeValidator.checkFieldIsArray(request.body.materialsAndOffers))
		throw new GenericError({
			code: ErrorCodes.courseMaterialsAndOffersTypeArray,
			error: new Error("Course materials and offers type should be an array"),
			errorCode: 400
		});

	if (!arrayValidator.checkArrOfStr(request.body.materialsAndOffers))
		throw new GenericError({
			code: ErrorCodes.courseMaterialsAndOffersElementTypeString,
			error: new Error("Course materials and offers should be array of strings"),
			errorCode: 400
		});

	if (!request.body.price)
		throw new GenericError({
			code: ErrorCodes.coursePriceRequired,
			error: new Error("Course price is required"),
			errorCode: 400
		});

	if (!request.body.price.currency)
		throw new GenericError({
			code: ErrorCodes.coursePriceCurrencyRequired,
			error: new Error("Course price currency is required"),
			errorCode: 400
		});

	if (!request.body.price.value)
		throw new GenericError({
			code: ErrorCodes.coursePriceValueRequired,
			error: new Error("Course price value is required"),
			errorCode: 400
		});

	if (!request.body.sections)
		throw new GenericError({
			code: ErrorCodes.courseSectionsRequired,
			error: new Error("Course sections are required"),
			errorCode: 400
		});

	if (!request.body.subtitles)
		throw new GenericError({
			code: ErrorCodes.courseSubtitlesRequired,
			error: new Error("Course subtitles are required"),
			errorCode: 400
		});

	if (!request.body.title)
		throw new GenericError({
			code: ErrorCodes.courseTitleRequired,
			error: new Error("Course title is required"),
			errorCode: 400
		});

	next();
}

export {
	updateCourseByInstructorRequestValidator
};