import nconf from "nconf";
import { VideoTranscoderImpl } from "../video-transcoder";
import { VideoTranscoder } from "../types";


function getVideoTranscoder(): VideoTranscoder {
	const transcoder = new VideoTranscoderImpl();

	transcoder.regionName = nconf.get("videoTranscoderRegionName");

	if (nconf.get("VIDEO_TRANSCODER_ACCESS_KEY"))
		transcoder.accessKeyId = nconf.get("VIDEO_TRANSCODER_ACCESS_KEY");

	if (nconf.get("VIDEO_TRANSCODER_SECRET_ACCESS_KEY"))
		transcoder.secretAccessKey = nconf.get("VIDEO_TRANSCODER_SECRET_ACCESS_KEY");

	transcoder.init();

	return transcoder;
}

export {
	getVideoTranscoder
};