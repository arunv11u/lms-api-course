import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { ObjectId } from "mongodb";
import { CourseStudentORMEntity } from "./course-student.orm-entity";



export class CourseStudentRepositoryImpl {
	private _collectionName = "course-students";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async getTotalStudentsCountWithCourseId(
		courseId: string
	): Promise<number> {
		const courseStudents = await this._mongodbRepository
			.find<CourseStudentORMEntity>(
				this._collectionName,
				{ course: new ObjectId(courseId) }
			);

		return courseStudents.length;
	}
}