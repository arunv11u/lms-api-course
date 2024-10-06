import { CourseCreatorEntity } from "./course-creator.entity.type";


class CourseCreatorEntityImpl implements CourseCreatorEntity {
	private _designation: string;
	private _firstName: string;
	private _lastName: string;
	private _profilePicture: string;

	get designation(): string {
		return this._designation;
	}
	set designation(designation: string) {
		this._designation = designation;
	}

	get firstName(): string {
		return this._firstName;
	}
	set firstName(firstName: string) {
		this._firstName = firstName;
	}

	get lastName(): string {
		return this._lastName;
	}
	set lastName(lastName: string) {
		this._lastName = lastName;
	}

	get profilePicture(): string {
		return this._profilePicture;
	}
	set profilePicture(profilePicture: string) {
		this._profilePicture = profilePicture;
	}
}

export {
	CourseCreatorEntityImpl
};