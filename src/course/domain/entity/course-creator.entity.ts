import { CourseCreatorEntity } from "./course-creator.entity.type";


class CourseCreatorEntityImpl implements CourseCreatorEntity {
	private _id: string;
	private _designation: string | null = null;
	private _firstName: string;
	private _lastName: string;
	private _profilePicture: string | null = null;

	get id(): string {
		return this._id;
	}
	set id(id: string) {
		this._id = id;
	}

	get designation(): string | null {
		return this._designation;
	}
	set designation(designation: string | null) {
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

	get profilePicture(): string | null {
		return this._profilePicture;
	}
	set profilePicture(profilePicture: string | null) {
		this._profilePicture = profilePicture;
	}
}

export {
	CourseCreatorEntityImpl
};