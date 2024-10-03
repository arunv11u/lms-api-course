import { ErrorCodes, Factory, GenericError } from "../../utils";
import {
	GetAllCoursesUseCaseImpl,
	UploadCourseImageUseCaseImpl,
	UploadLectureVideoUseCaseImpl
} from "../application";
import {
	CourseEntityImpl,
	CoursePriceEntityImpl,
	CourseRatingEntityImpl,
	CourseSectionEntityImpl,
	CourseSectionLectureEntityImpl
} from "../domain";
import { CourseRepositoryImpl } from "../infrastructure";



class CourseFactory implements Factory {

	private _objects: string[] = [
		"CoursePriceEntity",
		"CourseRatingEntity",
		"CourseSectionLectureEntity",
		"CourseSectionEntity",
		"CourseEntity",
		"GetAllCoursesUseCase",
		"UploadCourseImageUseCase",
		"UploadLectureVideoUseCase"
	];

	make(objectName: string) {

		if (objectName === "CoursePriceEntity")
			return new CoursePriceEntityImpl();

		if (objectName === "CourseRatingEntity")
			return new CourseRatingEntityImpl();

		if (objectName === "CourseSectionLectureEntity")
			return new CourseSectionLectureEntityImpl();

		if (objectName === "CourseSectionEntity")
			return new CourseSectionEntityImpl();

		if (objectName === "CourseEntity")
			return new CourseEntityImpl();

		if (objectName === "CourseRepository")
			return new CourseRepositoryImpl();

		if (objectName === "GetAllCoursesUseCase")
			return new GetAllCoursesUseCaseImpl();

		if (objectName === "UploadCourseImageUseCase")
			return new UploadCourseImageUseCaseImpl();

		if (objectName === "UploadLectureVideoUseCase")
			return new UploadLectureVideoUseCaseImpl();

		throw new GenericError({
			code: ErrorCodes.invalidFactoryObject,
			error: new Error("Requested object is invalid"),
			errorCode: 500
		});
	}

	getAll(): string[] {
		return this._objects;
	}
}

export {
	CourseFactory
};