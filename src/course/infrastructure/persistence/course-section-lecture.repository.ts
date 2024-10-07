import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { getCourseFactory } from "../../../global-config";
import { CourseEntity } from "../../domain";
import { CourseFactory } from "../../factory";
import { CourseSectionLectureORMEntity } from "./course-section-lecture.orm-entity";
import { ObjectId } from "mongodb";



export class CourseSectionLectureRepositoryImpl {
	private _collectionName = "course-section-lectures";
	private _mongodbRepository: MongoDBRepository;
	private _courseFactory: CourseFactory;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;

		this._courseFactory = getCourseFactory();
	}

	getId(): string {
		return new ObjectId().toString();
	}

	async addLecturesByInstructor(
		courseEntity: CourseEntity,
		instructorId: string
	): Promise<void> {
		const courseSectionLecturesORMEntity:
			CourseSectionLectureORMEntity[] = [];

		courseEntity.sections.forEach(section => {
			section.lectures.forEach(lecture => {
				courseSectionLecturesORMEntity.push({
					_id: new ObjectId(lecture.id),
					course: new ObjectId(courseEntity.id),
					createdBy: instructorId,
					creationDate: new Date(),
					description: lecture.description,
					duration: 0,
					isDeleted: false,
					lastModifiedBy: instructorId,
					lastModifiedDate: new Date(),
					link: lecture.link,
					section: new ObjectId(section.id),
					thumbnail: null,
					title: lecture.title,
					version: 1
				});
			});
		});

		await this._mongodbRepository.addRange<CourseSectionLectureORMEntity>(
			this._collectionName,
			courseSectionLecturesORMEntity
		);
	}
}