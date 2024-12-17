/* eslint-disable no-console */
import nconf from "nconf";
import { ElasticTranscoder } from "aws-sdk";
import { CourseEntity, CourseRepository } from "../../../course";
import {
	get2LetterISOCodeForLanguage,
	getMongoDBRepository,
	getS3Storage,
	getUUIDV4,
	getVideoTranscoder
} from "../../../utils";
import { getCourseFactory } from "../../../global-config";
import { TranscoderObject, TranscoderRepository } from "../../domain";


class TranscoderRepositoryImpl implements
	TranscoderRepository, TranscoderObject {

	async transcodeVideoLectures(courseEntity: CourseEntity): Promise<void> {
		const videoTranscoder = getVideoTranscoder();
		const transcodeJobs: Promise<void>[] = [];
		const pipelineId = nconf.get("elasticTranscoderPipelineId");
		const s3BaseFilePath = getS3Storage(nconf.get("s3BucketName")).baseFilePath;

		for (const section of courseEntity.sections) {
			for (const lecture of section.lectures) {
				const baseObjectKey = `public/courses/${courseEntity.id}/sections/${section.id}/lectures/${lecture.id}_${getUUIDV4()}`;

				// eslint-disable-next-line max-len
				const outputCaptionFormats: ElasticTranscoder.CaptionFormats = [];
				// eslint-disable-next-line max-len
				const inputCaptionSources: ElasticTranscoder.CaptionSources = [];

				lecture.subtitles.forEach(subtitle => {
					const subtitleKey = subtitle.url.split(s3BaseFilePath)[1];
					const language = get2LetterISOCodeForLanguage(
						subtitle.language
					);

					const captionKey = `${baseObjectKey}/${lecture.id}-{language}`;
					outputCaptionFormats.push({
						Format: "webvtt",
						Pattern: captionKey,
					});

					inputCaptionSources.push({
						Key: subtitleKey,
						Language: language,
						TimeOffset: "0",
						Label: subtitle.language,
					});
				});

				const lectureKey = lecture.link.split(s3BaseFilePath)[1];
				const input: ElasticTranscoder.JobInputs = [
					{
						Key: lectureKey,
						Container: "mp4",
						InputCaptions: {
							CaptionSources: inputCaptionSources,
							MergePolicy: "MergeOverride",
						},
					},
				];

				const output: ElasticTranscoder.CreateJobOutputs = [
					{
						Key: `${baseObjectKey}/${lecture.id}`,
						PresetId: nconf.get("elasticTranscoderHls2MPresetId"),
						SegmentDuration: "60",
						Captions: {
							CaptionFormats: outputCaptionFormats,
						},
						ThumbnailPattern: `${baseObjectKey}/${lecture.id}-{count}`,
					},
				];

				const playlist: ElasticTranscoder.CreateJobPlaylists = [
					{
						Format: "HLSv3",
						Name: `${baseObjectKey}/${lecture.id}-master-playlist`,
						OutputKeys: [
							`${baseObjectKey}/${lecture.id}`,
						],
					},
				];

				const userMetadata: ElasticTranscoder.UserMetadata = {
					lectureIds: lecture.id,
				};

				const job = videoTranscoder.createMultipleOutputHLSJob(
					pipelineId,
					input,
					output,
					playlist,
					userMetadata,
				);

				transcodeJobs.push(job);
			}
		}

		await Promise.all(transcodeJobs);
	}


	async transcodeVideoLecturesIfUpdated(
		courseEntity: CourseEntity
	): Promise<void> {
		const videoTranscoder = getVideoTranscoder();
		const transcodeJobs: Promise<void>[] = [];
		const pipelineId = nconf.get("elasticTranscoderPipelineId");
		const s3BaseFilePath = getS3Storage(nconf.get("s3BucketName")).baseFilePath;

		const courseRepository = getCourseFactory().make("CourseRepository") as CourseRepository;
		courseRepository.mongoDBRepository = getMongoDBRepository();

		const oldCourseLecturesMap = new Map<string, string>();

		const oldCourse = await courseRepository
			.getCourseWithId(courseEntity.id);

		oldCourse.sections.forEach(section => {
			section.lectures.forEach(lecture => {
				oldCourseLecturesMap.set(lecture.id, lecture.link);
			});
		});

		for (const section of courseEntity.sections) {
			for (const lecture of section.lectures) {
				const isNewLecture = !oldCourseLecturesMap.has(lecture.id);
				// eslint-disable-next-line max-len
				const isModifiedLecture = oldCourseLecturesMap.has(lecture.id) && oldCourseLecturesMap.get(lecture.id) !== lecture.link;

				// eslint-disable-next-line max-depth
				if (isNewLecture || isModifiedLecture) {
					const baseObjectKey = `public/courses/${courseEntity.id}/sections/${section.id}/lectures/${lecture.id}_${getUUIDV4()}`;

					// eslint-disable-next-line max-len
					const outputCaptionFormats: ElasticTranscoder.CaptionFormats = [];
					// eslint-disable-next-line max-len
					const inputCaptionSources: ElasticTranscoder.CaptionSources = [];

					lecture.subtitles.forEach(subtitle => {
						const subtitleKey = subtitle.url.split(
							s3BaseFilePath
						)[1];
						const language = get2LetterISOCodeForLanguage(
							subtitle.language
						);

						const captionKey = `${baseObjectKey}/${lecture.id}-{language}`;
						outputCaptionFormats.push({
							Format: "webvtt",
							Pattern: captionKey,
						});

						inputCaptionSources.push({
							Key: subtitleKey,
							Language: language,
							TimeOffset: "0",
							Label: subtitle.language,
						});
					});

					const lectureKey = lecture.link.split(s3BaseFilePath)[1];
					const input: ElasticTranscoder.JobInputs = [
						{
							Key: lectureKey,
							Container: "mp4",
							InputCaptions: {
								CaptionSources: inputCaptionSources,
								MergePolicy: "MergeOverride",
							},
						},
					];

					const output: ElasticTranscoder.CreateJobOutputs = [
						{
							Key: `${baseObjectKey}/${lecture.id}`,
							PresetId: nconf.get("elasticTranscoderHls2MPresetId"),
							SegmentDuration: "60",
							Captions: {
								CaptionFormats: outputCaptionFormats,
							},
							ThumbnailPattern: `${baseObjectKey}/${lecture.id}-{count}`,
						},
					];

					const playlist: ElasticTranscoder.CreateJobPlaylists = [
						{
							Format: "HLSv3",
							Name: `${baseObjectKey}/${lecture.id}-master-playlist`,
							OutputKeys: [`${baseObjectKey}/${lecture.id}`],
						},
					];

					const userMetadata: ElasticTranscoder.UserMetadata = {
						lectureIds: lecture.id,
					};

					const job = videoTranscoder.createMultipleOutputHLSJob(
						pipelineId,
						input,
						output,
						playlist,
						userMetadata,
					);

					transcodeJobs.push(job);
				}
			}
		}

		await Promise.all(transcodeJobs);
	}

}

export {
	TranscoderRepositoryImpl
};