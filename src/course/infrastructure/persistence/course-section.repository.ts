import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { AnyBulkWriteOperation, ObjectId } from "mongodb";
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
				order: section.order,
				version: 1
			}));

		await this._mongodbRepository.addRange<CourseSectionORMEntity>(
			this._collectionName,
			courseSectionsORMEntity
		);
	}

	async updateSectionsByInstructor(
		oldCourse: CourseEntity,
		course: CourseEntity,
		instructorId: string
	): Promise<void> {
		const oldCourseSectionIdsSet = new Set<string>();
		const courseSectionIdsSet = new Set<string>();
		const sectionsToBeDeleted: ObjectId[] = [];
		const newSections: {
			id: ObjectId;
			title: string;
			order: number;
		}[] = [];
		const operations: AnyBulkWriteOperation[] = [];

		oldCourse.sections
			.forEach(section => {
				oldCourseSectionIdsSet.add(section.id);
			});

		course.sections
			.forEach(section => {
				courseSectionIdsSet.add(section.id);
			});

		oldCourse.sections.forEach(section => {
			if (!courseSectionIdsSet.has(section.id))
				sectionsToBeDeleted.push(new ObjectId(section.id));
		});

		course.sections.forEach(section => {
			if (!oldCourseSectionIdsSet.has(section.id)) {
				newSections.push({
					id: new ObjectId(section.id),
					order: section.order,
					title: section.title
				});
			} else {
				const sectionORMEntity = new CourseSectionORMEntity();
				sectionORMEntity._id = new ObjectId(section.id);
				sectionORMEntity.lastModifiedBy = instructorId;
				sectionORMEntity.lastModifiedDate = new Date();
				sectionORMEntity.order = section.order;
				sectionORMEntity.title = section.title;

				operations.push({
					updateOne: {
						filter: {
							_id: new ObjectId(section.id)
						},
						update: {
							$set: sectionORMEntity,
							$inc: { version: 1 }
						}
					}
				});
			}
		});

		if(sectionsToBeDeleted.length)
			await this._deleteSections(sectionsToBeDeleted);

		if(newSections.length)
			await this._addSections(
				new ObjectId(course.id),
				newSections,
				instructorId
			);

		if(operations.length)
			await this._mongodbRepository.bulkWrite(
				this._collectionName,
				operations
			);
	}

	private async _deleteSections(
		sectionIds: ObjectId[]
	): Promise<void> {
		await this._mongodbRepository.removeRange<CourseSectionORMEntity>(
			this._collectionName,
			{
				_id: { $in: sectionIds }
			}
		);
	}

	private async _addSections(
		courseId: ObjectId,
		sections: {
			id: ObjectId;
			title: string;
			order: number;
		}[],
		instructorId: string
	): Promise<void> {
		const sectionsORMEntity = sections
			.map<CourseSectionORMEntity>(section => ({
				_id: section.id,
				course: courseId,
				createdBy: instructorId,
				creationDate: new Date(),
				isDeleted: false,
				lastModifiedBy: instructorId,
				lastModifiedDate: new Date(),
				order: section.order,
				title: section.title,
				version: 1
			}));

		await this._mongodbRepository.addRange<CourseSectionORMEntity>(
			this._collectionName,
			sectionsORMEntity
		);
	}
}