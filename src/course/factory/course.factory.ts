import { ErrorCodes, Factory, GenericError } from "../../utils";
import {
	CreateCourseByInstructorUseCaseImpl,
	ExploreAllCoursesUseCaseImpl,
	ProcessCourseTranscodingCompletedEventUseCaseImpl,
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
		"ExploreAllCoursesUseCase"
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