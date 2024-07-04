import { StringValidator } from "../types";
import { StringValidatorImpl } from "../validators";



export function getStringValidator(): StringValidator {
	return new StringValidatorImpl();
}