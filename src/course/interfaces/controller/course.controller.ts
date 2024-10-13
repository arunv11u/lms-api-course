import { Controller, Get, Post, Use } from "@arunvaradharajalu/common.decorators";
import { Request, Response, NextFunction } from "express";
import { ErrorCodes, GenericError, getResponseHandler, winstonLogger } from "../../../utils";
import { authorizationTokenName, getCourseFactory } from "../../../global-config";
import {
	CreateCourseByInstructorRequestDTOImpl,
	CreateCourseByInstructorUseCase,
	ExploreAllCoursesRequestDTOImpl,
	ExploreAllCoursesUseCase,
	GetAllCourseCategoriesUseCase,
	UploadCourseImageRequestDTOImpl,
	UploadCourseImageUseCase,
	UploadLectureSubtitleRequestDTOImpl,
	UploadLectureSubtitleUseCase,
	UploadLectureVideoRequestDTOImpl,
	UploadLectureVideoUseCase
} from "../../application";
import { createCourseByInstructorRequestValidator } from "../request-validator";



@Controller("/course")
export class CourseController {

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

	@Post("/upload-lecture-video")
	async uploadLectureVideo(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void> {
		const winston = winstonLogger.winston;
		try {
			winston.info("Uploading lecture video");

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

			const uploadLectureVideoRequestDTO =
				new UploadLectureVideoRequestDTOImpl();
			uploadLectureVideoRequestDTO.authorizationToken =
				authorizationToken;
			uploadLectureVideoRequestDTO.mimeType =
				request.body.mimeType;

			const uploadLectureVideoUseCase = courseFactory.make("UploadLectureVideoUseCase") as UploadLectureVideoUseCase;
			uploadLectureVideoUseCase
				.uploadLectureVideoRequestDTO =
				uploadLectureVideoRequestDTO;

			const uploadLectureVideoResponseDTO =
				await uploadLectureVideoUseCase
					.execute();

			responseHandler.ok(
				response,
				uploadLectureVideoResponseDTO
			);
		} catch (error) {
			winston.error(
				"Error in uploading lecture video:",
				error
			);

			next(error);
		}
	}

	@Post("/upload-lecture-subtitle")
	async uploadLectureSubtitle(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void> {
		const winston = winstonLogger.winston;
		try {
			winston.info("Uploading lecture subtitle");

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

			const uploadLectureSubtitleRequestDTO =
				new UploadLectureSubtitleRequestDTOImpl();
			uploadLectureSubtitleRequestDTO.authorizationToken =
				authorizationToken;
			uploadLectureSubtitleRequestDTO.mimeType =
				request.body.mimeType;

			const uploadLectureSubtitleUseCase = courseFactory.make("UploadLectureSubtitleUseCase") as UploadLectureSubtitleUseCase;
			uploadLectureSubtitleUseCase
				.uploadLectureSubtitleRequestDTO =
				uploadLectureSubtitleRequestDTO;

			const uploadLectureSubtitleResponseDTO =
				await uploadLectureSubtitleUseCase
					.execute();

			responseHandler.ok(
				response,
				uploadLectureSubtitleResponseDTO
			);
		} catch (error) {
			winston.error(
				"Error in uploading lecture subtitle:",
				error
			);

			next(error);
		}
	}

	@Post("/create-by-instructor")
	@Use(createCourseByInstructorRequestValidator)
	async createCourseByInstructor(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void> {
		const winston = winstonLogger.winston;
		try {
			winston.info("Creating a course by instructor");

			const courseFactory = getCourseFactory();
			const responseHandler = getResponseHandler();

			const createCourseByInstructorRequestDTO =
				new CreateCourseByInstructorRequestDTOImpl();
			createCourseByInstructorRequestDTO.authorizationToken =
				request.header(authorizationTokenName) as string;
			createCourseByInstructorRequestDTO.category = request.body.category;
			createCourseByInstructorRequestDTO.description =
				request.body.description;
			createCourseByInstructorRequestDTO.image = request.body.image;
			createCourseByInstructorRequestDTO.languages =
				request.body.languages;
			createCourseByInstructorRequestDTO.learnings =
				request.body.learnings;
			createCourseByInstructorRequestDTO.materialsAndOffers =
				request.body.materialsAndOffers;
			createCourseByInstructorRequestDTO.price = request.body.price;
			createCourseByInstructorRequestDTO.sections = request.body.sections;
			createCourseByInstructorRequestDTO.subtitles =
				request.body.subtitles;
			createCourseByInstructorRequestDTO.title = request.body.title;

			const createCourseByInstructorUseCase = courseFactory.make("CreateCourseByInstructorUseCase") as CreateCourseByInstructorUseCase;
			createCourseByInstructorUseCase
				.createCourseByInstructorRequestDTO =
				createCourseByInstructorRequestDTO;

			const createCourseByInstructorResponseDTO =
				await createCourseByInstructorUseCase
					.execute();

			responseHandler.ok(
				response,
				createCourseByInstructorResponseDTO
			);
		} catch (error) {
			winston.error(
				"Error in creating a course by instructor:",
				error
			);

			next(error);
		}
	}

	@Get("/explore")
	async exploreAllCourses(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void> {
		const winston = winstonLogger.winston;
		try {
			winston.info("Explore all courses");

			const courseFactory = getCourseFactory();
			const responseHandler = getResponseHandler();

			const exploreAllCoursesRequestDTO =
				new ExploreAllCoursesRequestDTOImpl();

			let categories = request.query.categories;

			if (categories && !Array.isArray(categories))
				categories = [categories as string];

			if (categories)
				exploreAllCoursesRequestDTO.categories = categories as string[];
			exploreAllCoursesRequestDTO.searchString =
				request.query.searchString as string;

			const exploreAllCoursesUseCase = courseFactory.make("ExploreAllCoursesUseCase") as ExploreAllCoursesUseCase;
			exploreAllCoursesUseCase
				.exploreAllCoursesRequestDTO = exploreAllCoursesRequestDTO;

			const exploreAllCoursesResponseDTO =
				await exploreAllCoursesUseCase
					.execute();

			responseHandler.ok(
				response,
				exploreAllCoursesResponseDTO
			);
		} catch (error) {
			winston.error(
				"Error in exploring all courses:",
				error
			);

			next(error);
		}
	}

	@Get("/category")
	async getAllCourseCategories(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void> {
		const winston = winstonLogger.winston;
		try {
			winston.info("Get all course categories");

			const courseFactory = getCourseFactory();
			const responseHandler = getResponseHandler();

			const getAllCourseCategoriesUseCase = courseFactory.make("GetAllCourseCategoriesUseCase") as GetAllCourseCategoriesUseCase;

			const courseCategories =
				await getAllCourseCategoriesUseCase
					.execute();

			responseHandler.ok<string[]>(
				response,
				courseCategories
			);
		} catch (error) {
			winston.error(
				"Error in getting all course categories:",
				error
			);

			next(error);
		}
	}
}