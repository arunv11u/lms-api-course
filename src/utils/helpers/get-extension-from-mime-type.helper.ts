/* eslint-disable indent */
import { GenericError } from "../errors";
import { ErrorCodes } from "../types";


enum Extensions {
	JPG = "jpg",
	JPEG = "jpeg",
	PNG = "png",
	MP4 = "mp4",
	SRT = "srt"
}

enum MimeTypes {
	JPG = "image/jpg",
	JPEG = "image/jpeg",
	PNG = "image/png",
	MP4 = "video/mp4",
	SRT = "text/plain"
}


function getExtensionFromMimeType(mimeType: string): string {
	let extension: string;

	switch (mimeType) {
		case MimeTypes.JPEG: {
			extension = Extensions.JPEG;
			break;
		}

		case MimeTypes.JPG: {
			extension = Extensions.JPG;
			break;
		}

		case MimeTypes.PNG: {
			extension = Extensions.PNG;
			break;
		}

		case MimeTypes.MP4: {
			extension = Extensions.MP4;
			break;
		}

		case MimeTypes.SRT: {
			extension = Extensions.SRT;
			break;
		}

		default: {
			throw new GenericError({
				code: ErrorCodes.internalError,
				error: new Error("Mimetype is invalid in getExtensionFromMimeType method"),
				errorCode: 500
			});
		}
	}

	return extension;
}

export {
	Extensions,
	MimeTypes,
	getExtensionFromMimeType
};