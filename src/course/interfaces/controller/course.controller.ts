import { Controller, Get } from "@arunvaradharajalu/common.decorators";
import { Request, Response, NextFunction } from "express";
import { getResponseHandler, winstonLogger } from "../../../utils";
import { getCourseFactory } from "../../../global-config";
import { GetAllCoursesUsecase } from "../../application";



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

			const GetAllCoursesUsecase = courseFactory.make("GetAllCoursesUsecase") as GetAllCoursesUsecase;

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
}