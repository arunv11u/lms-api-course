/* eslint-disable indent */
import { GenericError } from "../errors";
import { ErrorCodes } from "../types";


function get2LetterISOCodeForLanguage(language: string): string {
	switch (language) {
		case "English": {
			return "en";
		}

		default: {
			throw new GenericError({
				code: ErrorCodes.languageIsInvalidFor2LetterIsoCode,
				error: new Error("Language is invalid while retrieving 2 letter ISO code from language"),
				errorCode: 500
			});
		}
	}
}

export {
	get2LetterISOCodeForLanguage
};