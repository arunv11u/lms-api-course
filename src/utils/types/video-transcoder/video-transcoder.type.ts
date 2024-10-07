import { ElasticTranscoder } from "aws-sdk";


abstract class VideoTranscoder {
	abstract set regionName(regionName: string);
	abstract set accessKeyId(accessKeyId: string);
	abstract set secretAccessKey(secretAccessKey: string);

	abstract init(): boolean;

	abstract createMultipleOutputHLSJob(
		pipelineId: string,
		inputs: ElasticTranscoder.JobInputs,
		outputs: ElasticTranscoder.CreateJobOutputs,
		playlists: ElasticTranscoder.CreateJobPlaylists,
		userMetadata: ElasticTranscoder.UserMetadata
	): Promise<void>;
}

export {
	VideoTranscoder
};