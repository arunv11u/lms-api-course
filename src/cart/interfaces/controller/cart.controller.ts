import { Controller, Post } from "@arunvaradharajalu/common.decorators";
import { Request, Response, NextFunction } from "express";
import { ErrorCodes, GenericError, getResponseHandler, winstonLogger } from "../../../utils";
import { authorizationTokenName, getCartFactory } from "../../../global-config";
import {
	AddCourseToCartRequestDTOImpl,
	AddCourseToCartResponseDTO,
	AddCourseToCartUseCase
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
			winston.info("Uploading course image");

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
}