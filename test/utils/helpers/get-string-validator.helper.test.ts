import { StringValidatorImpl, getStringValidator } from "../../../src/utils";





describe("Helper Module", () => {

	describe("\"getStringValidator\" method", () => {
		describe("Happy Path", () => {
			it("Should return string validator", () => {
				const stringValidator = getStringValidator();

				expect(stringValidator).toBeInstanceOf(StringValidatorImpl);
			});
		});
	});
});