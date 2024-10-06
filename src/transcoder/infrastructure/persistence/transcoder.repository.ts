import nconf from "nconf";
import { ElasticTranscoder } from "aws-sdk";
import { CourseEntity } from "../../../course";
import {
	get2LetterISOCodeForLanguage,
	getS3Storage,
	// getVideoTranscoder
} from "../../../utils";

class TranscoderRepository {

	async transcodeVideLectures(
		courseEntity: CourseEntity
	): Promise<void> {
		// const videoTranscoder = getVideoTranscoder();
		const transcodeJobs: Promise<void>[] = [];
		// const pipelineId = nconf.get("elasticTranscoderPipelineId");
		const s3BaseFilePath = getS3Storage(nconf.get("s3BucketName")).baseFilePath;

		const inputs: ElasticTranscoder.JobInputs = [];
		const outputs: ElasticTranscoder.CreateJobOutputs = [];
		const playlists: ElasticTranscoder.CreateJobPlaylists = [];
		const lectureIds: string[] = [];
		let lectureCount = 0;

		courseEntity.sections.forEach(section => {
			section.lectures.forEach(lecture => {

				lectureCount++;

				if (lectureCount > 4) {
					// const userMetadata: ElasticTranscoder.UserMetadata = {
					// 	lectureIds: JSON.stringify(lectureIds)
					// };

					// const job = videoTranscoder.createMultipleOutputHLSJob(
					// 	pipelineId,
					// 	inputs,
					// 	outputs,
					// 	playlists,
					// 	userMetadata
					// );
					// transcodeJobs.push(job);

					// eslint-disable-next-line no-console
					console.log("inputs :: outputs :: playlists :: userMetadata ::", inputs, outputs, playlists, lectureIds);

					inputs.length = 0;
					outputs.length = 0;
					playlists.length = 0;
					lectureIds.length = 0;
				} else {
					const baseObjectKey = `public/courses/${courseEntity.id}/sections/${section.id}/lectures`;

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

						const captionKey = `${baseObjectKey}/${lecture.id}`;
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
							MergePolicy: "MergeAndOverride"
						}
					});

					const outputKey = `${baseObjectKey}/${lecture.id}`;
					const thumbnailKey = `${baseObjectKey}/${lecture.id}`;
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
				}
			});
		});

		await Promise.all(transcodeJobs);
	}
}

export {
	TranscoderRepository
};