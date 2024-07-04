import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { ObjectId } from "mongodb";
import { ErrorCodes, GenericError } from "../../../utils";
import { getCourseFactory } from "../../../global-config";
import { CourseSectionEntity } from "../../domain";
import { CourseFactory } from "../../factory";
import { CourseSectionORMEntity } from "./course-section.orm-entity";
import { CourseSectionLectureRepositoryImpl } from "./course-section-lecture.repository";



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

	async getAllWithCourseId(
		courseId: string
	): Promise<CourseSectionEntity[]> {
		const courseSectionsORMEntity = await this._mongodbRepository
			.find<CourseSectionORMEntity>(
				this._collectionName,
				{ course: new ObjectId(courseId) }
			);

		const courseSectionsPromises = courseSectionsORMEntity
			.map(async (courseSectionORMEntity) => {
				const courseSection = await this._getEntity(
					courseId,
					courseSectionORMEntity
				);

				return courseSection;
			});

		const courseSections = await Promise.all(courseSectionsPromises);

		return courseSections;
	}

	async getTotalSectionsCountWithCourseId(
		courseId: string
	): Promise<number> {
		const courseSectionsORMEntity = await this._mongodbRepository
			.find<CourseSectionORMEntity>(
				this._collectionName,
				{ course: new ObjectId(courseId) }
			);

		return courseSectionsORMEntity.length;
	}

	private async _getEntity(
		courseId: string,
		courseSectionORMEntity: CourseSectionORMEntity
	): Promise<CourseSectionEntity> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const courseSectionLectureRepository =
			new CourseSectionLectureRepositoryImpl(
				this._mongodbRepository
			);

		const courseSectionEntity = this._courseFactory
			.make("CourseSectionEntity") as CourseSectionEntity;
		courseSectionEntity.id = courseSectionORMEntity._id.toString();

		courseSectionEntity.lectures = await courseSectionLectureRepository
			.getAllWithCourseIdAndSectionId(
				courseId,
				courseSectionORMEntity._id.toString()
			);

		courseSectionEntity.lecturesCount = await courseSectionLectureRepository
			.getLecturesCountWithCourseIdAndSectionId(
				courseId,
				courseSectionORMEntity._id.toString()
			);

		courseSectionEntity.lecturesDuration =
			await courseSectionLectureRepository
				.getLecturesDurationWithCourseIdAndSectionId(
					courseId,
					courseSectionORMEntity._id.toString()
				);

		courseSectionEntity.title = courseSectionORMEntity.title;

		return courseSectionEntity;
	}
}