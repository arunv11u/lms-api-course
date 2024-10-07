

abstract class CourseCreatorEntity {
	abstract get id(): string;
	abstract set id(id: string);

	abstract get firstName(): string;
	abstract set firstName(firstName: string);

	abstract get lastName(): string;
	abstract set lastName(lastName: string);

	abstract get profilePicture(): string | null;
	abstract set profilePicture(profilePicture: string | null);

	abstract get designation(): string | null;
	abstract set designation(designation: string | null);
}

export {
	CourseCreatorEntity
};