import { AnyBulkWriteOperation, ObjectId } from "mongodb";
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
					order: lecture.order,
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

	async updateLecturesByInstructor(
		oldCourse: CourseEntity,
		course: CourseEntity,
		instructorId: string
	): Promise<void> {
		const oldCourseSectionIdsSet = new Set<string>();
		const courseSectionIdsSet = new Set<string>();
		const oldCourseLectureIdsMap = new Map<string, string>();
		const courseLectureIdsMap = new Map<string, string>();
		const lecturesToBeDeleted: ObjectId[] = [];
		const newLectures: {
			id: ObjectId;
			title: string;
			description: string;
			duration: number;
			link: string;
			order: number;
			sectionId: ObjectId;
		}[] = [];
		const operations: AnyBulkWriteOperation[] = [];

		oldCourse.sections
			.forEach(section => {
				oldCourseSectionIdsSet.add(section.id);

				section.lectures.forEach(lecture => {
					oldCourseLectureIdsMap.set(
						lecture.id,
						lecture.link
					);
				});
			});

		course.sections
			.forEach(section => {
				courseSectionIdsSet.add(section.id);

				section.lectures.forEach(lecture => {
					courseLectureIdsMap.set(
						lecture.id,
						lecture.link
					);
				});
			});

		oldCourse.sections.forEach(section => {
			if (!courseSectionIdsSet.has(section.id)) {
				const lectureIds = section.lectures
					.map(lecture => new ObjectId(lecture.id));

				lecturesToBeDeleted.push(...lectureIds);
			} else {
				section.lectures.forEach(lecture => {
					if (!courseLectureIdsMap.has(lecture.id))
						lecturesToBeDeleted.push(new ObjectId(lecture.id));
				});
			}
		});

		course.sections.forEach(section => {
			if (!oldCourseSectionIdsSet.has(section.id)) {
				section.lectures.forEach(lecture => {
					newLectures.push({
						description: lecture.description,
						duration: lecture.duration,
						id: new ObjectId(lecture.id),
						link: lecture.link,
						order: lecture.order,
						title: lecture.title,
						sectionId: new ObjectId(section.id)
					});
				});
			} else {
				section.lectures.forEach(lecture => {
					if (!oldCourseLectureIdsMap.has(lecture.id)) {
						newLectures.push({
							description: lecture.description,
							duration: lecture.duration,
							id: new ObjectId(lecture.id),
							link: lecture.link,
							order: lecture.order,
							sectionId: new ObjectId(section.id),
							title: lecture.title
						});
					} else {
						const lectureORMEntity =
							new CourseSectionLectureORMEntity();
						lectureORMEntity._id = new ObjectId(lecture.id);
						lectureORMEntity.description = lecture.description;
						lectureORMEntity.lastModifiedBy = instructorId;
						lectureORMEntity.lastModifiedDate = new Date();
						lectureORMEntity.link = lecture.link;
						lectureORMEntity.order = lecture.order;
						lectureORMEntity.section = new ObjectId(section.id);

						const oldCourseLectureLink = oldCourseLectureIdsMap
							.get(lecture.id);
						if (oldCourseLectureLink !== lecture.link)
							lectureORMEntity.status = 
								// eslint-disable-next-line max-len
								CourseSectionLectureStatuses.transcodingInProgress;
						else lectureORMEntity.status = 
							CourseSectionLectureStatuses.transcodingCompleted;

						lectureORMEntity.title = lecture.title;

						operations.push({
							updateOne: {
								filter: {
									_id: new ObjectId(lecture.id)
								},
								update: {
									$set: lectureORMEntity,
									$inc: { version: 1 }
								}
							}
						});
					}
				});
			}
		});

		if(lecturesToBeDeleted.length)
			await this._deleteLectures(lecturesToBeDeleted);

		if(newLectures.length)
			await this._addLectures(
				new ObjectId(course.id),
				newLectures,
				instructorId
			);

		if(operations.length)
			await this._mongodbRepository.bulkWrite(
				this._collectionName,
				operations
			);
	}

	private async _deleteLectures(
		lectureIds: ObjectId[]
	) {
		await this._mongodbRepository
			.removeRange<CourseSectionLectureORMEntity>(
				this._collectionName,
				{
					_id: { $in: lectureIds }
				}
			);
	}

	// eslint-disable-next-line max-params
	private async _addLectures(
		courseId: ObjectId,
		lectures: {
			id: ObjectId;
			title: string;
			description: string;
			duration: number;
			link: string;
			order: number;
			sectionId: ObjectId;
		}[],
		instructorId: string
	) {
		const lecturesORMEntity: CourseSectionLectureORMEntity[] = [];
		lectures.forEach(lecture => {
			const lectureORMEntity = new CourseSectionLectureORMEntity();
			lectureORMEntity._id = lecture.id;
			lectureORMEntity.course = courseId;
			lectureORMEntity.createdBy = instructorId;
			lectureORMEntity.creationDate = new Date();
			lectureORMEntity.description = lecture.description;
			lectureORMEntity.duration = lecture.duration;
			lectureORMEntity.isDeleted = false;
			lectureORMEntity.lastModifiedBy = instructorId;
			lectureORMEntity.lastModifiedDate = new Date();
			lectureORMEntity.link = lecture.link;
			lectureORMEntity.order = lecture.order;
			lectureORMEntity.section = lecture.sectionId;
			lectureORMEntity.status =
				CourseSectionLectureStatuses.transcodingInProgress;
			lectureORMEntity.thumbnail = null;
			lectureORMEntity.title = lecture.title;
			lectureORMEntity.version = 1;

			lecturesORMEntity.push(lectureORMEntity);
		});

		await this._mongodbRepository
			.addRange<CourseSectionLectureORMEntity>(
				this._collectionName,
				lecturesORMEntity
			);
	}
}