import { ErrorCodes, Factory, GenericError } from "../../utils";
import {
	CreateCourseByInstructorUseCaseImpl,
	ExploreACourseUseCaseImpl,
	ExploreAllCoursesUseCaseImpl,
	GetAllCourseCategoriesUseCaseImpl,
	ProcessCourseTranscodingCompletedEventUseCaseImpl,
	UpdateCourseByInstructorUseCaseImpl,
	UploadCourseImageUseCaseImpl,
	UploadLectureSubtitleUseCaseImpl,
	UploadLectureVideoUseCaseImpl
} from "../application";
import {
	CourseEntityImpl,
	CourseObject
} from "../domain";
import { CourseRepositoryImpl } from "../infrastructure";



class CourseFactory implements Factory {

	private _objects: string[] = [
		"CourseEntity",
		"UploadCourseImageUseCase",
		"UploadLectureVideoUseCase",
		"UploadLectureSubtitleUseCase",
		"CreateCourseByInstructorUseCase",
		"ProcessCourseTranscodingCompletedEventUseCase",
		"ExploreAllCoursesUseCase",
		"GetAllCourseCategoriesUseCase",
		"ExploreACourseUseCase",
		"UpdateCourseByInstructorUseCase"
	];

	make(objectName: string): CourseObject {

		if (objectName === "CourseEntity")
			return new CourseEntityImpl();

		if (objectName === "CourseRepository")
			return new CourseRepositoryImpl();

		if (objectName === "UploadCourseImageUseCase")
			return new UploadCourseImageUseCaseImpl();

		if (objectName === "UploadLectureVideoUseCase")
			return new UploadLectureVideoUseCaseImpl();

		if (objectName === "UploadLectureSubtitleUseCase")
			return new UploadLectureSubtitleUseCaseImpl();

		if (objectName === "CreateCourseByInstructorUseCase")
			return new CreateCourseByInstructorUseCaseImpl();

		if (objectName === "ProcessCourseTranscodingCompletedEventUseCase")
			return new ProcessCourseTranscodingCompletedEventUseCaseImpl();

		if (objectName === "ExploreAllCoursesUseCase")
			return new ExploreAllCoursesUseCaseImpl();

		if (objectName === "GetAllCourseCategoriesUseCase")
			return new GetAllCourseCategoriesUseCaseImpl();

		if (objectName === "ExploreACourseUseCase")
			return new ExploreACourseUseCaseImpl();

		if (objectName === "UpdateCourseByInstructorUseCase")
			return new UpdateCourseByInstructorUseCaseImpl();

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