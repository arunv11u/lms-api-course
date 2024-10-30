import { ObjectId } from "mongodb";
import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { CourseStudentORMEntity } from "./course-student.orm-entity";



export class CourseStudentRepositoryImpl {
	private _collectionName = "course-students";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async enrollStudentForCourses(
		studentId: string,
		courseIds: ObjectId[]
	): Promise<void> {
		const courseStudentsORMEntity = courseIds.map(courseId => {
			const courseStudentORMEntity = new CourseStudentORMEntity();

			courseStudentORMEntity._id = new ObjectId();
			courseStudentORMEntity.course = courseId;
			courseStudentORMEntity.createdBy = studentId.toString();
			courseStudentORMEntity.creationDate = new Date();
			courseStudentORMEntity.isDeleted = false;
			courseStudentORMEntity.lastModifiedBy = studentId.toString();
			courseStudentORMEntity.lastModifiedDate = new Date();
			courseStudentORMEntity.student = studentId;
			courseStudentORMEntity.version = 1;

			return courseStudentORMEntity;
		});

		await this._mongodbRepository.addRange<CourseStudentORMEntity>(
			this._collectionName,
			courseStudentsORMEntity
		);
	}

	async getEnrolledCourseIdsOfStudent(
		studentId: string
	): Promise<ObjectId[]> {
		const courseStudentsORMEntity = await this._mongodbRepository
			.find<CourseStudentORMEntity>(
				this._collectionName,
				{
					student: studentId
				}
			);

		const courseIds = courseStudentsORMEntity
			.map(courseStudent => courseStudent.course);

		return courseIds;
	}

	async isStudentEnrolledForCourse(
		courseId: ObjectId,
		studentId: string
	): Promise<boolean> {
		const courseStudentORMEntity = await this._mongodbRepository
			.findOne<CourseStudentORMEntity>(
				this._collectionName,
				{
					course: courseId,
					student: studentId
				}
			);

		if (!courseStudentORMEntity) return false;

		return true;
	}
}