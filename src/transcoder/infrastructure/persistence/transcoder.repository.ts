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

	async transcodeVideoLectures(
		courseEntity: CourseEntity
	): Promise<void> {
		const videoTranscoder = getVideoTranscoder();
		const transcodeJobs: Promise<void>[] = [];
		const pipelineId = nconf.get("elasticTranscoderPipelineId");
		const s3BaseFilePath = getS3Storage(nconf.get("s3BucketName")).baseFilePath;

		const inputs: ElasticTranscoder.JobInputs = [];
		const outputs: ElasticTranscoder.CreateJobOutputs = [];
		const playlists: ElasticTranscoder.CreateJobPlaylists = [];
		const lectureIds: string[] = [];
		let lectureCount = 0;

		courseEntity.sections.forEach(section => {
			section.lectures.forEach(lecture => {
				const baseObjectKey = `public/courses/${courseEntity.id}/sections/${section.id}/lectures/${lecture.id}_${getUUIDV4()}`;

				const outputCaptionFormats:
					ElasticTranscoder.CaptionFormats = [];
				const inputCaptionSources:
					ElasticTranscoder.CaptionSources = [];

				lecture.subtitles.forEach(subtitle => {

					const subtitleKey = subtitle.url
						.split(s3BaseFilePath)[1];

					const language = get2LetterISOCodeForLanguage(
						subtitle.language
					);

					const captionKey = `${baseObjectKey}/${lecture.id}-{language}`;
					outputCaptionFormats.push({
						Format: "webvtt",
						Pattern: captionKey
					});

					inputCaptionSources.push({
						Key: subtitleKey,
						Language: language,
						TimeOffset: "0",
						Label: subtitle.language
					});
				});

				const lectureKey = lecture.link.split(s3BaseFilePath)[1];
				inputs.push({
					Key: lectureKey,
					Container: "mp4",
					InputCaptions: {
						CaptionSources: inputCaptionSources,
						MergePolicy: "MergeOverride"
					}
				});

				const outputKey = `${baseObjectKey}/${lecture.id}`;
				const thumbnailKey = `${baseObjectKey}/${lecture.id}-{count}`;
				outputs.push({
					Key: outputKey,
					PresetId: nconf.get("elasticTranscoderHls2MPresetId"),
					SegmentDuration: "60",
					Captions: {
						CaptionFormats: outputCaptionFormats
					},
					ThumbnailPattern: thumbnailKey
				});

				const playlistName = `${baseObjectKey}/${lecture.id}-master-playlist`;
				playlists.push({
					Format: "HLSv3",
					Name: playlistName,
					OutputKeys: [
						outputKey
					]
				});

				lectureIds.push(lecture.id);

				lectureCount++;

				if (lectureCount === 4) {
					const userMetadata: ElasticTranscoder.UserMetadata = {
						lectureIds: lectureIds.join(",")
					};

					const job = videoTranscoder.createMultipleOutputHLSJob(
						pipelineId,
						inputs,
						outputs,
						playlists,
						userMetadata
					);

					transcodeJobs.push(job);

					inputs.length = 0;
					outputs.length = 0;
					playlists.length = 0;
					lectureIds.length = 0;

					lectureCount = 0;
				}
			});
		});

		if (lectureCount !== 0) {
			const userMetadata: ElasticTranscoder.UserMetadata = {
				lectureIds: lectureIds.join(",")
			};

			const job = videoTranscoder.createMultipleOutputHLSJob(
				pipelineId,
				inputs,
				outputs,
				playlists,
				userMetadata
			);

			transcodeJobs.push(job);
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

		const inputs: ElasticTranscoder.JobInputs = [];
		const outputs: ElasticTranscoder.CreateJobOutputs = [];
		const playlists: ElasticTranscoder.CreateJobPlaylists = [];
		const lectureIds: string[] = [];
		let lectureCount = 0;

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

		courseEntity.sections.forEach(section => {
			section.lectures.forEach(lecture => {
				if (!oldCourseLecturesMap.has(lecture.id)) {
					const baseObjectKey = `public/courses/${courseEntity.id}/sections/${section.id}/lectures/${lecture.id}_${getUUIDV4()}`;

					const outputCaptionFormats:
						ElasticTranscoder.CaptionFormats = [];
					const inputCaptionSources:
						ElasticTranscoder.CaptionSources = [];

					lecture.subtitles.forEach(subtitle => {

						const subtitleKey = subtitle.url
							.split(s3BaseFilePath)[1];

						const language = get2LetterISOCodeForLanguage(
							subtitle.language
						);

						const captionKey = `${baseObjectKey}/${lecture.id}-{language}`;
						outputCaptionFormats.push({
							Format: "webvtt",
							Pattern: captionKey
						});

						inputCaptionSources.push({
							Key: subtitleKey,
							Language: language,
							TimeOffset: "0",
							Label: subtitle.language
						});
					});

					const lectureKey = lecture.link.split(s3BaseFilePath)[1];
					inputs.push({
						Key: lectureKey,
						Container: "mp4",
						InputCaptions: {
							CaptionSources: inputCaptionSources,
							MergePolicy: "MergeOverride"
						}
					});

					const outputKey = `${baseObjectKey}/${lecture.id}`;
					const thumbnailKey = `${baseObjectKey}/${lecture.id}-{count}`;
					outputs.push({
						Key: outputKey,
						PresetId: nconf.get("elasticTranscoderHls2MPresetId"),
						SegmentDuration: "60",
						Captions: {
							CaptionFormats: outputCaptionFormats
						},
						ThumbnailPattern: thumbnailKey
					});

					const playlistName = `${baseObjectKey}/${lecture.id}-master-playlist`;
					playlists.push({
						Format: "HLSv3",
						Name: playlistName,
						OutputKeys: [
							outputKey
						]
					});

					lectureIds.push(lecture.id);

					lectureCount++;
				} else {
					const oldLectureLink = oldCourseLecturesMap.get(lecture.id);

					if (oldLectureLink !== lecture.link) {
						const baseObjectKey = `public/courses/${courseEntity.id}/sections/${section.id}/lectures/${lecture.id}_${getUUIDV4()}`;

						const outputCaptionFormats:
							ElasticTranscoder.CaptionFormats = [];
						const inputCaptionSources:
							ElasticTranscoder.CaptionSources = [];

						lecture.subtitles.forEach(subtitle => {

							const subtitleKey = subtitle.url
								.split(s3BaseFilePath)[1];

							const language = get2LetterISOCodeForLanguage(
								subtitle.language
							);

							const captionKey = `${baseObjectKey}/${lecture.id}-{language}`;
							outputCaptionFormats.push({
								Format: "webvtt",
								Pattern: captionKey
							});

							inputCaptionSources.push({
								Key: subtitleKey,
								Language: language,
								TimeOffset: "0",
								Label: subtitle.language
							});
						});

						const lectureKey = lecture.link
							.split(s3BaseFilePath)[1];
						inputs.push({
							Key: lectureKey,
							Container: "mp4",
							InputCaptions: {
								CaptionSources: inputCaptionSources,
								MergePolicy: "MergeOverride"
							}
						});

						const outputKey = `${baseObjectKey}/${lecture.id}`;
						const thumbnailKey = `${baseObjectKey}/${lecture.id}-{count}`;
						outputs.push({
							Key: outputKey,
							PresetId: nconf.get("elasticTranscoderHls2MPresetId"),
							SegmentDuration: "60",
							Captions: {
								CaptionFormats: outputCaptionFormats
							},
							ThumbnailPattern: thumbnailKey
						});

						const playlistName = `${baseObjectKey}/${lecture.id}-master-playlist`;
						playlists.push({
							Format: "HLSv3",
							Name: playlistName,
							OutputKeys: [
								outputKey
							]
						});

						lectureIds.push(lecture.id);

						lectureCount++;
					}
				}

				if (lectureCount === 4) {
					const userMetadata: ElasticTranscoder.UserMetadata = {
						lectureIds: lectureIds.join(",")
					};

					const job = videoTranscoder.createMultipleOutputHLSJob(
						pipelineId,
						inputs,
						outputs,
						playlists,
						userMetadata
					);

					transcodeJobs.push(job);

					inputs.length = 0;
					outputs.length = 0;
					playlists.length = 0;
					lectureIds.length = 0;

					lectureCount = 0;
				}
			});
		});

		if (lectureCount !== 0) {
			const userMetadata: ElasticTranscoder.UserMetadata = {
				lectureIds: lectureIds.join(",")
			};

			const job = videoTranscoder.createMultipleOutputHLSJob(
				pipelineId,
				inputs,
				outputs,
				playlists,
				userMetadata
			);

			transcodeJobs.push(job);
		}

		await Promise.all(transcodeJobs);
	}
}

export {
	TranscoderRepositoryImpl
};