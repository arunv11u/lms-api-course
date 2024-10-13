import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { CourseObject, CourseRepository } from "../../domain";
import { GetAllCourseCategoriesUseCase } from "./get-all-course-categories.use-case.type";



export class GetAllCourseCategoriesUseCaseImpl implements
	GetAllCourseCategoriesUseCase, CourseObject {
	private _unitOfWork: UnitOfWork;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
	}

	async execute(): Promise<string[]> {
		const courseRepository = this._unitOfWork
			.getRepository("CourseRepository") as CourseRepository;

		const courseCategories = await courseRepository
			.getAllCourseCategories();

		return courseCategories.docs;
	}
}