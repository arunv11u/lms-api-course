import { AxiosImpl } from "@arunvaradharajalu/common.axios";
import { GenericError } from "../errors";
import { ErrorCodes } from "../types";

async function getHLSDurationFromURL(m3u8Url: string): Promise<number> {
	try {
		const axios = new AxiosImpl();
		const response = await axios.get<string>(m3u8Url);
		const content = response.data;

		const lines = content.split("\n");
		let totalDuration = 0;

		lines.forEach(line => {
			if (line.startsWith("#EXTINF")) {
				const duration = parseFloat(line.split(":")[1]);
				totalDuration += duration;
			}
		});

		return totalDuration;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("Error fetching the m3u8 file:", error);

		throw new GenericError({
			code: ErrorCodes.hlsDurationFromUrl,
			error: new Error("Error in retrieving hls duration from url"),
			errorCode: 500
		});
	}
}

export {
	getHLSDurationFromURL
};