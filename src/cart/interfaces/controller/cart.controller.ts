import { Controller, Post } from "@arunvaradharajalu/common.decorators";
import { Request, Response, NextFunction } from "express";
import { ErrorCodes, GenericError, getResponseHandler, winstonLogger } from "../../../utils";
import { authorizationTokenName, getCartFactory } from "../../../global-config";
import {
	AddCourseToCartRequestDTOImpl,
	AddCourseToCartResponseDTO,
	AddCourseToCartUseCase,
	ClearAllCoursesFromCartRequestDTOImpl,
	ClearAllCoursesFromCartUseCase,
	RemoveCourseFromCartRequestDTOImpl,
	RemoveCourseFromCartResponseDTO,
	RemoveCourseFromCartUseCase
} from "../../application";


@Controller("/cart")
export class CartController {

	@Post("/add-course")
	async addCourseToCart(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		const winston = winstonLogger.winston;
		try {
			winston.info("Adding course to a cart");

			const authorizationToken = request.header(authorizationTokenName);
			if (!authorizationToken)
				throw new GenericError({
					code: ErrorCodes.invalidAuthorizationToken,
					error: new Error("Invalid authorization token"),
					errorCode: 400
				});

			if (!request.body.courseId)
				throw new GenericError({
					code: ErrorCodes.courseIdRequired,
					error: new Error("Course id is required"),
					errorCode: 400
				});

			const cartFactory = getCartFactory();
			const responseHandler = getResponseHandler();

			const addCourseToCartRequestDTO =
				new AddCourseToCartRequestDTOImpl();
			addCourseToCartRequestDTO.authorizationToken = authorizationToken;
			addCourseToCartRequestDTO.courseId = request.body.courseId;

			const addCourseToCartUseCase = cartFactory.make("AddCourseToCartUseCase") as AddCourseToCartUseCase;
			addCourseToCartUseCase.addCourseToCartRequestDTO =
				addCourseToCartRequestDTO;

			const addCourseToCartResponseDTO =
				await addCourseToCartUseCase
					.execute() as AddCourseToCartResponseDTO;

			responseHandler.ok<AddCourseToCartResponseDTO>(
				response,
				addCourseToCartResponseDTO
			);
		} catch (error) {
			winston.error(
				"Error in adding course to a cart:",
				error
			);

			next(error);
		}
	}

	@Post("/remove-course")
	async removeCourseFromCart(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		const winston = winstonLogger.winston;
		try {
			winston.info("Removing a course from cart");

			const authorizationToken = request.header(authorizationTokenName);
			if (!authorizationToken)
				throw new GenericError({
					code: ErrorCodes.invalidAuthorizationToken,
					error: new Error("Invalid authorization token"),
					errorCode: 400
				});

			if (!request.body.courseId)
				throw new GenericError({
					code: ErrorCodes.courseIdRequired,
					error: new Error("Course id is required"),
					errorCode: 400
				});

			const cartFactory = getCartFactory();
			const responseHandler = getResponseHandler();

			const removeCourseFromCartRequestDTO =
				new RemoveCourseFromCartRequestDTOImpl();
			removeCourseFromCartRequestDTO
				.authorizationToken = authorizationToken;
			removeCourseFromCartRequestDTO.courseId = request.body.courseId;

			const removeCourseFromCartUseCase = cartFactory.make("RemoveCourseFromCartUseCase") as RemoveCourseFromCartUseCase;
			removeCourseFromCartUseCase.removeCourseFromCartRequestDTO =
				removeCourseFromCartRequestDTO;

			const removeCourseFromCartResponseDTO =
				await removeCourseFromCartUseCase
					.execute() as RemoveCourseFromCartResponseDTO;

			responseHandler.ok<RemoveCourseFromCartResponseDTO>(
				response,
				removeCourseFromCartResponseDTO
			);
		} catch (error) {
			winston.error(
				"Error in removing course from a cart:",
				error
			);

			next(error);
		}
	}

	@Post("/clear-all-courses")
	async clearAllCoursesFromCart(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		const winston = winstonLogger.winston;
		try {
			winston.info("Clearing all courses from cart");

			const authorizationToken = request.header(authorizationTokenName);
			if (!authorizationToken)
				throw new GenericError({
					code: ErrorCodes.invalidAuthorizationToken,
					error: new Error("Invalid authorization token"),
					errorCode: 400
				});

			const cartFactory = getCartFactory();
			const responseHandler = getResponseHandler();

			const clearAllCoursesFromCartRequestDTO =
				new ClearAllCoursesFromCartRequestDTOImpl();
			clearAllCoursesFromCartRequestDTO
				.authorizationToken = authorizationToken;

			const clearAllCoursesFromCartUseCase = cartFactory.make("ClearAllCoursesFromCartUseCase") as ClearAllCoursesFromCartUseCase;
			clearAllCoursesFromCartUseCase.clearAllCoursesFromCartRequestDTO =
				clearAllCoursesFromCartRequestDTO;

			await clearAllCoursesFromCartUseCase
				.execute();

			responseHandler.ok<null>(
				response
			);
		} catch (error) {
			winston.error(
				"Error in clearing all courses from a cart:",
				error
			);

			next(error);
		}
	}
}