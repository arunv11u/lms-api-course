import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { ObjectId } from "mongodb";
import { getCourseFactory } from "../../../global-config";
import { CourseEntity } from "../../domain";
import { CourseFactory } from "../../factory";
import { CourseSectionORMEntity } from "./course-section.orm-entity";



export class CourseSectionRepositoryImpl {
	private _collectionName = "course-sections";
	private _mongodbRepository: MongoDBRepository;
	private _courseFactory: CourseFactory;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;

		this._courseFactory = getCourseFactory();
	}

	getId(): string {
		return new ObjectId().toString();
	}

	async addSectionsByInstructor(
		courseEntity: CourseEntity,
		instructorId: string
	): Promise<void> {
		const courseSectionsORMEntity = courseEntity.sections
			.map<CourseSectionORMEntity>(section => ({
				_id: new ObjectId(section.id),
				course: new ObjectId(courseEntity.id),
				createdBy: instructorId,
				creationDate: new Date(),
				isDeleted: false,
				lastModifiedBy: instructorId,
				lastModifiedDate: new Date(),
				title: section.title,
				version: 1
			}));

		await this._mongodbRepository.addRange<CourseSectionORMEntity>(
			this._collectionName,
			courseSectionsORMEntity
		);
	}
}