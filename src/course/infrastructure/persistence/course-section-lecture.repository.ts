import { ObjectId } from "mongodb";
import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { CourseEntity, CourseSectionLectureStatuses } from "../../domain";
import { CourseSectionLectureORMEntity } from "./course-section-lecture.orm-entity";



export class CourseSectionLectureRepositoryImpl {
	private _collectionName = "course-section-lectures";
	private _mongodbRepository: MongoDBRepository;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
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
					status: lecture.status,
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

	// eslint-disable-next-line max-params
	async markLectureAsTranscoded(
		lectureId: string,
		lectureUrl: string,
		thumbnailUrl: string,
		duration: number
	): Promise<void> {

		await this._mongodbRepository.update<CourseSectionLectureORMEntity>(
			this._collectionName,
			{ _id: new ObjectId(lectureId) },
			{
				$set: {
					link: lectureUrl,
					thumbnail: thumbnailUrl,
					duration: duration,
					status: CourseSectionLectureStatuses.transcodingCompleted
				}
			}
		);
	}
}