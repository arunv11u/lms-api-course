import {
	DocsCountList,
	Repository,
	UploadPreSignedURLResponse
} from "../../../utils";
import { CourseEntity } from "../entity";



export abstract class CourseRepository extends Repository {
	abstract getId(): string;

	abstract getAll(): Promise<DocsCountList<CourseEntity>>;

	abstract uploadCourseImage(
		mimeType: string
	): Promise<UploadPreSignedURLResponse>;
}