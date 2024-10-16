import { CourseRepository } from "../../../course";
import { TokenRepository } from "../../../token";
import { ErrorCodes, GenericError, UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { CartObject, CartRepository } from "../../domain";
import {
	AddCourseToCartCourseResponseDTOImpl,
	AddCourseToCartRequestDTO,
	AddCourseToCartResponseDTO,
	AddCourseToCartResponseDTOImpl
} from "../dto";
import { AddCourseToCartUseCase } from "./add-course-to-cart.use-case.type";




export class AddCourseToCartUseCaseImpl implements
	AddCourseToCartUseCase, CartObject {
	private _unitOfWork: UnitOfWork;
	private _addCourseToCartRequestDTO:
		AddCourseToCartRequestDTO;
	private _addCourseToCartResponseDTO:
		AddCourseToCartResponseDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
		this._addCourseToCartResponseDTO =
			new AddCourseToCartResponseDTOImpl();
	}

	set addCourseToCartRequestDTO(
		addCourseToCartRequestDTO: AddCourseToCartRequestDTO
	) {
		this._addCourseToCartRequestDTO = addCourseToCartRequestDTO;
	}

	async execute(): Promise<AddCourseToCartResponseDTO> {
		try {
			await this._unitOfWork.start();

			const tokenRepository = this._unitOfWork
				.getRepository("TokenRepository") as TokenRepository;
			const cartRepository = this._unitOfWork
				.getRepository("CartRepository") as CartRepository;
			const courseRepository = this._unitOfWork
				.getRepository("CourseRepository") as CourseRepository;

			const { id: studentId } = await tokenRepository
				.validateStudentAuthorizationToken(
					this._addCourseToCartRequestDTO.authorizationToken
				);

			if (!await courseRepository
				.isCourseExists(this._addCourseToCartRequestDTO.courseId)
			) throw new GenericError({
				code: ErrorCodes.courseNotFound,
				error: new Error("Course not found"),
				errorCode: 404
			});

			const cartEntity = await cartRepository
				.addCourseToCart(
					this._addCourseToCartRequestDTO.courseId,
					studentId
				);

			cartEntity.courses.forEach(course => {
				const addCourseToCartCourseResponseDTO =
					new AddCourseToCartCourseResponseDTOImpl();

				addCourseToCartCourseResponseDTO.category = course.category;
				addCourseToCartCourseResponseDTO.currency = course.currency;
				addCourseToCartCourseResponseDTO.description =
					course.description;
				addCourseToCartCourseResponseDTO.id = course.id;
				addCourseToCartCourseResponseDTO.image = course.image;
				addCourseToCartCourseResponseDTO.title = course.title;
				addCourseToCartCourseResponseDTO.value = course.value;

				this._addCourseToCartResponseDTO.courses
					.push(addCourseToCartCourseResponseDTO);
			});

			this._addCourseToCartResponseDTO.currency = cartEntity.currency;
			this._addCourseToCartResponseDTO.id = cartEntity.id;
			this._addCourseToCartResponseDTO.tax = cartEntity.tax;
			this._addCourseToCartResponseDTO.totalvalue = cartEntity.totalvalue;

			await this._unitOfWork.complete();

			return this._addCourseToCartResponseDTO;
		} catch (error) {
			await this._unitOfWork.dispose();

			throw error;
		}
	}
}