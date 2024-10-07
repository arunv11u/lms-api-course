import { ElasticTranscoder } from "aws-sdk";
import { VideoTranscoderConnectionError } from "../errors";
import { VideoTranscoder } from "../types";

class VideoTranscoderImpl implements VideoTranscoder {

	private _transcoder: ElasticTranscoder | null = null;
	private _regionName: string | null = null;
	private _accessKeyId: string | null = null;
	private _secretAccessKey: string | null = null;

	set regionName(regionName: string) {
		this._regionName = regionName;
	}

	set accessKeyId(accessKeyId: string) {
		this._accessKeyId = accessKeyId;
	}

	set secretAccessKey(secretAccessKey: string) {
		this._secretAccessKey = secretAccessKey;
	}

	init(): boolean {
		if (!this._regionName)
			throw new VideoTranscoderConnectionError("Video transcoder, region name is required");

		let credentials = null;
		if (
			this._accessKeyId &&
			this._secretAccessKey
		) {
			credentials = {
				accessKeyId: this._accessKeyId,
				secretAccessKey: this._secretAccessKey
			};
		}

		this._transcoder = new ElasticTranscoder({
			region: this._regionName,
			credentials: credentials
		});

		return true;
	}

	// eslint-disable-next-line max-params
	async createMultipleOutputHLSJob(
		pipelineId: string,
		inputs: ElasticTranscoder.JobInputs,
		outputs: ElasticTranscoder.CreateJobOutputs,
		playlists: ElasticTranscoder.CreateJobPlaylists,
		userMetadata: ElasticTranscoder.UserMetadata
	): Promise<void> {
		if (!this._transcoder)
			throw new VideoTranscoderConnectionError("Transcoder must be initialized before calling createMultipleOutputHLSJob method");

		await this._transcoder.createJob({
			PipelineId: pipelineId,
			Inputs: inputs,
			Outputs: outputs,
			Playlists: playlists,
			UserMetadata: userMetadata
		}).promise();
	}
}

export {
	VideoTranscoderImpl
};