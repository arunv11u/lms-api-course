import {
	DocsCountList,
	Repository,
	UploadPreSignedURLResponse
} from "../../../utils";
import { CourseEntity } from "../entity";
import { CoursePaginationValueObject } from "../value-objects";



export abstract class CourseRepository extends Repository {
	abstract getId(): string;

	abstract getSectionId(): string;

	abstract getSectionLectureId(): string;

	abstract uploadCourseImage(
		mimeType: string
	): Promise<UploadPreSignedURLResponse>;

	abstract uploadLectureVideo(
		mimeType: string
	): Promise<UploadPreSignedURLResponse>;

	abstract uploadLectureSubtitle(
		mimeType: string
	): Promise<UploadPreSignedURLResponse>;

	abstract createCourseByInstructor(
		course: CourseEntity,
		instructorId: string
	): Promise<CourseEntity>;

	abstract completeTranscodingForLecture(
		lectureId: string,
		lectureUrl: string,
		thumbnailUrl: string,
		duration: number
	): Promise<void>;

	abstract addTranscodedLecturesToCourseTranscodingCompletedRegistry(
		id: string,
		courseId: string,
		lectureIds: string[]
	): Promise<void>;

	abstract exploreAllCourses(
		searchString: string | null,
		categories: string[],
		pagination: CoursePaginationValueObject
	): Promise<DocsCountList<CourseEntity>>;

	abstract getAllCourseCategories(): Promise<DocsCountList<string>>;

	abstract exploreACourse(
		courseId: string
	): Promise<CourseEntity>;

	abstract isCourseExists(id: string): Promise<boolean>;

	abstract updateCourseByInstructor(
		course: CourseEntity,
		instructorId: string
	): Promise<CourseEntity>;

	abstract getCourseWithId(
		courseId: string
	): Promise<CourseEntity>;

	abstract enrollStudentForCourses(
		studentId: string,
		courseIds: string[]
	): Promise<void>;

	abstract getMyLearnings(
		studentId: string
	): Promise<CourseEntity[]>;

	abstract isStudentEnrolledForCourse(
		courseId: string,
		studentId: string
	): Promise<boolean>;

	abstract getMyCourse(
		courseId: string
	): Promise<CourseEntity>;
}