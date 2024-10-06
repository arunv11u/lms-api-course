


abstract class CourseCreatorEntity {
	abstract get firstName(): string;
	abstract set firstName(firstName: string);

	abstract get lastName(): string;
	abstract set lastName(lastName: string);

	abstract get profilePicture(): string;
	abstract set profilePicture(profilePicture: string);

	abstract get designation(): string;
	abstract set designation(designation: string);
}

export {
	CourseCreatorEntity
};