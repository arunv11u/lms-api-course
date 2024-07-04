/* eslint-disable indent */
import { GenericError } from "../errors";
import { ErrorCodes } from "../types";


enum Extensions {
	JPG = "jpg",
	JPEG = "jpeg",
	PNG = "png",
	AAC = "aac",
	X_AAC = "x-aac",
	DOC = "doc",
	DOCX = "docx",
	PDF = "pdf"
}

enum MimeTypes {
	JPG = "image/jpg",
	JPEG = "image/jpeg",
	PNG = "image/png",
	AAC = "audio/aac",
	X_AAC = "audio/x-aac",
	DOC = "application/msword",
	DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	PDF = "application/pdf"
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

		case MimeTypes.AAC: {
			extension = Extensions.AAC;
			break;
		}

		case MimeTypes.X_AAC: {
			extension = Extensions.X_AAC;
			break;
		}

		case MimeTypes.DOC: {
			extension = Extensions.DOC;
			break;
		}

		case MimeTypes.DOCX: {
			extension = Extensions.DOCX;
			break;
		}

		case MimeTypes.PDF: {
			extension = Extensions.PDF;
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