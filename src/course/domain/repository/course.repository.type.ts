import {
	DocsCountList,
	Repository,
	UploadPreSignedURLResponse
} from "../../../utils";
import { CourseEntity } from "../entity";



export abstract class CourseRepository extends Repository {
	abstract getId(): string;

	abstract getSectionId(): string;

	abstract getSectionLectureId(): string;

	abstract getAll(): Promise<DocsCountList<CourseEntity>>;

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
}