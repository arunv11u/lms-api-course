import { ObjectId } from "mongodb";
import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { CourseEntity } from "../../domain";
import { CourseLearningORMEntity } from "./course-learning.orm-entity";



export class CourseLearningRepositoryImpl {
	private _collectionName = "course-learnings";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async addLearningsByInstructor(
		courseEntity: CourseEntity,
		instructorId: string
	): Promise<void> {
		const courseLearningsORMEntity = courseEntity.learnings
			.map<CourseLearningORMEntity>(
				learning => ({
					_id: new ObjectId(),
					course: new ObjectId(courseEntity.id),
					createdBy: instructorId,
					creationDate: new Date(),
					isDeleted: false,
					lastModifiedBy: instructorId,
					lastModifiedDate: new Date(),
					learning: learning,
					version: 1
				})
			);

		await this._mongodbRepository.addRange<CourseLearningORMEntity>(
			this._collectionName,
			courseLearningsORMEntity
		);
	}

	async updateLearningsByInstructor(
		oldCourse: CourseEntity,
		course: CourseEntity,
		instructorId: string
	): Promise<void> {
		const oldCourseLearningsMap =
			new Set<string>(oldCourse.learnings);
		const courseLearningsMap = new Set<string>(course.learnings);
		const learningsToBeDeleted: string[] = [];
		const learningsToBeAdded: string[] = [];

		oldCourse.learnings.forEach(learning => {
			if (!courseLearningsMap.has(learning))
				learningsToBeDeleted.push(learning);
		});

		course.learnings.forEach(learning => {
			if (!oldCourseLearningsMap.has(learning))
				learningsToBeAdded.push(learning);
		});

		if(learningsToBeDeleted.length)
			await this._deleteLearnings(
				new ObjectId(course.id),
				learningsToBeDeleted
			);

		if(learningsToBeAdded.length)
			await this._addLearnings(
				new ObjectId(course.id),
				learningsToBeAdded,
				instructorId
			);
	}

	private async _deleteLearnings(
		courseId: ObjectId,
		learnings: string[]
	) {
		await this._mongodbRepository.removeRange<CourseLearningORMEntity>(
			this._collectionName,
			{
				course: courseId,
				learning: { $in: learnings }
			}
		);
	}

	private async _addLearnings(
		courseId: ObjectId,
		learnings: string[],
		instructorId: string
	) {
		const courseLearningsORMEntity = learnings
			.map<CourseLearningORMEntity>(learning => ({
				_id: new ObjectId(),
				course: courseId,
				createdBy: instructorId,
				creationDate: new Date(),
				isDeleted: false,
				learning: learning,
				lastModifiedBy: instructorId,
				lastModifiedDate: new Date(),
				version: 1
			}));

		await this._mongodbRepository.addRange<CourseLearningORMEntity>(
			this._collectionName,
			courseLearningsORMEntity
		);
	}
}