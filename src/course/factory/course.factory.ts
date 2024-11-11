import { ErrorCodes, Factory, GenericError } from "../../utils";
import {
	CreateCourseByInstructorUseCaseImpl,
	ExploreACourseUseCaseImpl,
	ExploreAllCoursesUseCaseImpl,
	GetAllCourseCategoriesUseCaseImpl,
	GetAllCoursesByInstructorUseCaseImpl,
	GetCourseByInstructorUseCaseImpl,
	GetLastViewedCourseUseCaseImpl,
	GetMyCourseUseCaseImpl,
	GetMyLearningsUseCaseImpl,
	ProcessCourseTranscodingCompletedEventUseCaseImpl,
	UpdateCourseByInstructorUseCaseImpl,
	UpdateLectureWatchDurationUseCaseImpl,
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
		"UpdateCourseByInstructorUseCase",
		"GetMyLearningsUseCase",
		"GetMyCourseUseCase",
		"GetCourseByInstructorUseCase",
		"UpdateLectureWatchDurationUseCase",
		"GetAllCoursesByInstructorUseCase",
		"GetLastViewedCourseUseCase"
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

		if (objectName === "GetMyLearningsUseCase")
			return new GetMyLearningsUseCaseImpl();

		if (objectName === "GetMyCourseUseCase")
			return new GetMyCourseUseCaseImpl();

		if (objectName === "GetCourseByInstructorUseCase")
			return new GetCourseByInstructorUseCaseImpl();

		if (objectName === "UpdateLectureWatchDurationUseCase")
			return new UpdateLectureWatchDurationUseCaseImpl();

		if (objectName === "GetAllCoursesByInstructorUseCase")
			return new GetAllCoursesByInstructorUseCaseImpl();

		if (objectName === "GetLastViewedCourseUseCase")
			return new GetLastViewedCourseUseCaseImpl();

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