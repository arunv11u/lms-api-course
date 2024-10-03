import { Controller, Get, Post } from "@arunvaradharajalu/common.decorators";
import { Request, Response, NextFunction } from "express";
import { ErrorCodes, GenericError, getResponseHandler, winstonLogger } from "../../../utils";
import { authorizationTokenName, getCourseFactory } from "../../../global-config";
import { GetAllCoursesUseCase, UploadCourseImageRequestDTOImpl, UploadCourseImageUseCase } from "../../application";



@Controller("/course")
export class CourseController {

	@Get("/")
	async getCourseList(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void> {
		const winston = winstonLogger.winston;
		try {
			winston.info("Get Course List");

			const courseFactory = getCourseFactory();
			const responseHandler = getResponseHandler();

			const GetAllCoursesUsecase = courseFactory.make("GetAllCoursesUseCase") as GetAllCoursesUseCase;

			const getAllCoursesResponseDTO =
				await GetAllCoursesUsecase.execute();

			responseHandler.ok(response, getAllCoursesResponseDTO);
		} catch (error) {
			winston.error(
				"Error in get course list:",
				error
			);

			next(error);
		}
	}

	@Post("/upload-image")
	async uploadCourseImage(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void> {
		const winston = winstonLogger.winston;
		try {
			winston.info("Uploading course image");

			const authorizationToken = request.header(authorizationTokenName);
			if (!authorizationToken)
				throw new GenericError({
					code: ErrorCodes.invalidAuthorizationToken,
					error: new Error("Invalid authorization token"),
					errorCode: 400
				});

			if (!request.body.mimeType)
				throw new GenericError({
					code: ErrorCodes.courseImageMimeTypeRequired,
					error: new Error("Mime type required"),
					errorCode: 400
				});

			const courseFactory = getCourseFactory();
			const responseHandler = getResponseHandler();

			const uploadCourseImageRequestDTO =
				new UploadCourseImageRequestDTOImpl();
			uploadCourseImageRequestDTO.authorizationToken =
				authorizationToken;
			uploadCourseImageRequestDTO.mimeType =
				request.body.mimeType;

			const uploadCourseImageUseCase = courseFactory.make("UploadCourseImageUseCase") as UploadCourseImageUseCase;
			uploadCourseImageUseCase
				.uploadCourseImageRequestDTO =
				uploadCourseImageRequestDTO;

			const uploadCourseImageResponseDTO =
				await uploadCourseImageUseCase
					.execute();

			responseHandler.ok(
				response,
				uploadCourseImageResponseDTO
			);
		} catch (error) {
			winston.error(
				"Error in uploading course image:",
				error
			);

			next(error);
		}
	}
}