import { Repository } from "../../../utils";
import { CartEntity } from "../entity";


export abstract class CartRepository extends Repository {
	abstract getId(): string;

	abstract addCourseToCart(
		courseId: string,
		studentId: string
	): Promise<CartEntity>;

	abstract removeCourseFromCart(
		courseId: string,
		studentId: string
	): Promise<CartEntity>;
}