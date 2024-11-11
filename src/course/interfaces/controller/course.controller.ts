/* eslint-disable max-lines */
import { Controller, Get, Post, Put, Use } from "@arunvaradharajalu/common.decorators";
import { Request, Response, NextFunction } from "express";
import { ErrorCodes, GenericError, getResponseHandler, winstonLogger } from "../../../utils";
import { authorizationTokenName, getCourseFactory } from "../../../global-config";
import {
	CreateCourseByInstructorRequestDTOImpl,
	CreateCourseByInstructorUseCase,
	ExploreACourseRequestDTOImpl,
	ExploreACourseUseCase,
	ExploreAllCoursesRequestDTOImpl,
	ExploreAllCoursesUseCase,
	GetAllCourseCategoriesUseCase,
	GetAllCoursesByInstructorRequestDTOImpl,
	GetAllCoursesByInstructorResponseDTO,
	GetAllCoursesByInstructorUseCase,
	GetCourseByInstructorRequestDTOImpl,
	GetCourseByInstructorResponseDTO,
	GetCourseByInstructorUseCase,
	GetLastViewedCourseRequestDTOImpl,
	GetLastViewedCourseResponseDTO,
	GetLastViewedCourseUseCase,
	GetMyCourseRequestDTOImpl,
	GetMyCourseResponseDTO,
	GetMyCourseUseCase,
	GetMyLearningsRequestDTOImpl,
	GetMyLearningsResponseDTO,
	GetMyLearningsUseCase,
	UpdateCourseByInstructorRequestDTOImpl,
	UpdateCourseByInstructorUseCase,
	UploadCourseImageRequestDTOImpl,
	UploadCourseImageUseCase,
	UploadLectureSubtitleRequestDTOImpl,
	UploadLectureSubtitleUseCase,
	UploadLectureVideoRequestDTOImpl,
	UploadLectureVideoUseCase
} from "../../application";
import {
	createCourseByInstructorRequestValidator,
	updateCourseByInstructorRequestValidator
} from "../request-validator";



@Controller("/course")
export class CourseController {

	@Get("/explore/:id")
	async exploreACourses(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void> {
		const winston = winstonLogger.winston;
		try {
			winston.info(`Explore a courses : ${request.params.id}`);

			const courseFactory = getCourseFactory();
			const responseHandler = getResponseHandler();

			if (!request.params.id)
				throw new GenericError({
					code: ErrorCodes.courseIdRequired,
					error: new Error("Course id is required"),
					errorCode: 400
				});

			const exploreACourseRequestDTO =
				new ExploreACourseRequestDTOImpl();

			exploreACourseRequestDTO.courseId = request.params.id;

			const exploreACourseUseCase = courseFactory.make("ExploreACourseUseCase") as ExploreACourseUseCase;
			exploreACourseUseCase
				.exploreACourseRequestDTO = exploreACourseRequestDTO;

			const exploreACourseResponseDTO =
				await exploreACourseUseCase
					.execute();

			responseHandler.ok(
				response,
				exploreACourseResponseDTO
			);
		} catch (error) {
			winston.error(
				"Error in exploring a course:",
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

	@Put("/update-by-instructor")
	@Use(updateCourseByInstructorRequestValidator)
	async updateCourseByInstructor(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void> {
		const winston = winstonLogger.winston;
		try {
			winston.info("Updating a course by instructor");

			const courseFactory = getCourseFactory();
			const responseHandler = getResponseHandler();

			const updateCourseByInstructorRequestDTO =
				new UpdateCourseByInstructorRequestDTOImpl();
			updateCourseByInstructorRequestDTO.authorizationToken =
				request.header(authorizationTokenName) as string;
			updateCourseByInstructorRequestDTO.category = request.body.category;
			updateCourseByInstructorRequestDTO.description =
				request.body.description;
			updateCourseByInstructorRequestDTO.id = request.body.id;
			updateCourseByInstructorRequestDTO.image = request.body.image;
			updateCourseByInstructorRequestDTO.languages =
				request.body.languages;
			updateCourseByInstructorRequestDTO.learnings =
				request.body.learnings;
			updateCourseByInstructorRequestDTO.materialsAndOffers =
				request.body.materialsAndOffers;
			updateCourseByInstructorRequestDTO.price = request.body.price;
			updateCourseByInstructorRequestDTO.sections = request.body.sections;
			updateCourseByInstructorRequestDTO.subtitles =
				request.body.subtitles;
			updateCourseByInstructorRequestDTO.title = request.body.title;

			const updateCourseByInstructorUseCase = courseFactory.make("UpdateCourseByInstructorUseCase") as UpdateCourseByInstructorUseCase;
			updateCourseByInstructorUseCase
				.updateCourseByInstructorRequestDTO =
				updateCourseByInstructorRequestDTO;

			const updateCourseByInstructorResponseDTO =
				await updateCourseByInstructorUseCase
					.execute();

			responseHandler.ok(
				response,
				updateCourseByInstructorResponseDTO
			);
		} catch (error) {
			winston.error(
				"Error in updating a course by instructor:",
				error
			);

			next(error);
		}
	}

	@Get("/my-learnings")
	async getMyLearnings(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void> {
		const winston = winstonLogger.winston;
		try {
			winston.info("Retrieving my learnings of a student");

			const courseFactory = getCourseFactory();
			const responseHandler = getResponseHandler();

			const getMyLearningsRequestDTO =
				new GetMyLearningsRequestDTOImpl();

			const authorizationToken = request.header(authorizationTokenName);
			if (!authorizationToken)
				throw new GenericError({
					code: ErrorCodes.invalidAuthorizationToken,
					error: new Error("Invalid authorization token"),
					errorCode: 400
				});

			getMyLearningsRequestDTO.authorizationToken = authorizationToken;

			const getMyLearningsUseCase = courseFactory.make("GetMyLearningsUseCase") as GetMyLearningsUseCase;
			getMyLearningsUseCase
				.getMyLearningsRequestDTO = getMyLearningsRequestDTO;

			const getMyLearningsResponseDTO =
				await getMyLearningsUseCase
					.execute();

			responseHandler.ok<GetMyLearningsResponseDTO[]>(
				response,
				getMyLearningsResponseDTO
			);
		} catch (error) {
			winston.error(
				"Error in retrieving my learnings of a student:",
				error
			);

			next(error);
		}
	}

	@Get("/my-course")
	async getMyCourse(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void> {
		const winston = winstonLogger.winston;
		try {
			winston.info("Retrieving my course of a student");

			const courseFactory = getCourseFactory();
			const responseHandler = getResponseHandler();

			const authorizationToken = request.header(authorizationTokenName);
			if (!authorizationToken)
				throw new GenericError({
					code: ErrorCodes.invalidAuthorizationToken,
					error: new Error("Invalid authorization token"),
					errorCode: 400
				});

			if (!request.query.courseId)
				throw new GenericError({
					code: ErrorCodes.courseIdRequired,
					error: new Error("Course id is required"),
					errorCode: 400
				});

			const getMyCourseRequestDTO =
				new GetMyCourseRequestDTOImpl();

			getMyCourseRequestDTO.authorizationToken = authorizationToken;
			getMyCourseRequestDTO.courseId = request.query.courseId as string;

			const getMyCourseUseCase = courseFactory.make("GetMyCourseUseCase") as GetMyCourseUseCase;
			getMyCourseUseCase
				.getMyCourseRequestDTO = getMyCourseRequestDTO;

			const getMyCourseResponseDTO =
				await getMyCourseUseCase
					.execute();

			responseHandler.ok<GetMyCourseResponseDTO>(
				response,
				getMyCourseResponseDTO
			);
		} catch (error) {
			winston.error(
				"Error in retrieving my course of a student:",
				error
			);

			next(error);
		}
	}

	@Get("/by-instructor")
	async getCourseByInstructor(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void> {
		const winston = winstonLogger.winston;
		try {
			winston.info("Retrieving a course by instructor");

			const courseFactory = getCourseFactory();
			const responseHandler = getResponseHandler();

			const authorizationToken = request.header(authorizationTokenName);
			if (!authorizationToken)
				throw new GenericError({
					code: ErrorCodes.invalidAuthorizationToken,
					error: new Error("Invalid authorization token"),
					errorCode: 400
				});

			if (!request.query.courseId)
				throw new GenericError({
					code: ErrorCodes.courseIdRequired,
					error: new Error("Course id is required"),
					errorCode: 400
				});

			const getCourseByInstructorRequestDTO =
				new GetCourseByInstructorRequestDTOImpl();

			getCourseByInstructorRequestDTO.authorizationToken =
				authorizationToken;
			getCourseByInstructorRequestDTO.courseId =
				request.query.courseId as string;

			const getCourseByInstructorUseCase = courseFactory.make("GetCourseByInstructorUseCase") as GetCourseByInstructorUseCase;
			getCourseByInstructorUseCase
				.getCourseByInstructorRequestDTO =
				getCourseByInstructorRequestDTO;

			const getCourseByInstructorResponseDTO =
				await getCourseByInstructorUseCase
					.execute();

			responseHandler.ok<GetCourseByInstructorResponseDTO>(
				response,
				getCourseByInstructorResponseDTO
			);
		} catch (error) {
			winston.error(
				"Error in retrieving a course by instructor:",
				error
			);

			next(error);
		}
	}

	@Get("/all-by-instructor")
	async getAllCoursesByInstructor(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void> {
		const winston = winstonLogger.winston;
		try {
			winston.info("Retrieving all courses by instructor");

			const courseFactory = getCourseFactory();
			const responseHandler = getResponseHandler();

			const getAllCoursesByInstructorRequestDTO =
				new GetAllCoursesByInstructorRequestDTOImpl();

			const authorizationToken = request.header(authorizationTokenName);
			if (!authorizationToken)
				throw new GenericError({
					code: ErrorCodes.invalidAuthorizationToken,
					error: new Error("Invalid authorization token"),
					errorCode: 400
				});

			getAllCoursesByInstructorRequestDTO.authorizationToken =
				authorizationToken;

			const getAllCoursesByInstructorUseCase = courseFactory
				.make("GetAllCoursesByInstructorUseCase") as GetAllCoursesByInstructorUseCase;
			getAllCoursesByInstructorUseCase
				.getAllCoursesByInstructorRequestDTO =
				getAllCoursesByInstructorRequestDTO;

			const getAllCoursesByInstructorResponseDTO =
				await getAllCoursesByInstructorUseCase
					.execute();

			responseHandler.ok<GetAllCoursesByInstructorResponseDTO[]>(
				response,
				getAllCoursesByInstructorResponseDTO
			);
		} catch (error) {
			winston.error(
				"Error in retrieving all courses by instructor:",
				error
			);

			next(error);
		}
	}

	@Get("/last-viewed-course")
	async getLastViewedCourse(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void> {
		const winston = winstonLogger.winston;
		try {
			winston.info("Retrieving last viewed course of a student");

			const courseFactory = getCourseFactory();
			const responseHandler = getResponseHandler();

			const authorizationToken = request.header(authorizationTokenName);
			if (!authorizationToken)
				throw new GenericError({
					code: ErrorCodes.invalidAuthorizationToken,
					error: new Error("Invalid authorization token"),
					errorCode: 400
				});

			const getLastViewedCourseRequestDTO =
				new GetLastViewedCourseRequestDTOImpl();

			getLastViewedCourseRequestDTO.authorizationToken = 
				authorizationToken;

			const getLastViewedCourseUseCase = courseFactory.make("GetLastViewedCourseUseCase") as GetLastViewedCourseUseCase;
			getLastViewedCourseUseCase
				.getLastViewedCourseRequestDTO = getLastViewedCourseRequestDTO;

			const getLastViewedCourseResponseDTO =
				await getLastViewedCourseUseCase
					.execute();

			responseHandler.ok<GetLastViewedCourseResponseDTO | null>(
				response,
				getLastViewedCourseResponseDTO
			);
		} catch (error) {
			winston.error(
				"Error in retrieving last viewed course of a student:",
				error
			);

			next(error);
		}
	}
}