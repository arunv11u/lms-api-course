import nconf from "nconf";
import { VideoTranscoderImpl } from "../video-transcoder";
import { VideoTranscoder } from "../types";


function getVideoTranscoder(): VideoTranscoder {
	const transcoder = new VideoTranscoderImpl();

	transcoder.regionName = nconf.get("videoTranscoderRegionName");

	if (nconf.get("VIDEO_TRANSCODER_ACCESS_KEY_ID"))
		transcoder.accessKeyId = nconf.get("VIDEO_TRANSCODER_ACCESS_KEY_ID");

	if (nconf.get("VIDEO_TRANSCODER_SECRET_ACCESS_KEY_ID"))
		transcoder.secretAccessKey = nconf.get("VIDEO_TRANSCODER_SECRET_ACCESS_KEY_ID");

	transcoder.init();

	return transcoder;
}

export {
	getVideoTranscoder
};