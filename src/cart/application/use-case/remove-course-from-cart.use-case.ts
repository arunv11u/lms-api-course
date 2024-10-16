import { CourseRepository } from "../../../course";
import { TokenRepository } from "../../../token";
import { ErrorCodes, GenericError, UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { CartObject, CartRepository } from "../../domain";
import {
	RemoveCourseFromCartCourseResponseDTOImpl,
	RemoveCourseFromCartRequestDTO,
	RemoveCourseFromCartResponseDTO,
	RemoveCourseFromCartResponseDTOImpl
} from "../dto";
import { RemoveCourseFromCartUseCase } from "./remove-course-from-cart.use-case.type";



export class RemoveCourseFromCartUseCaseImpl implements
	RemoveCourseFromCartUseCase, CartObject {
	private _unitOfWork: UnitOfWork;
	private _removeCourseFromCartRequestDTO:
		RemoveCourseFromCartRequestDTO;
	private _removeCourseFromCartResponseDTO:
		RemoveCourseFromCartResponseDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
		this._removeCourseFromCartResponseDTO =
			new RemoveCourseFromCartResponseDTOImpl();
	}

	set removeCourseFromCartRequestDTO(
		removeCourseFromCartRequestDTO: RemoveCourseFromCartRequestDTO
	) {
		this._removeCourseFromCartRequestDTO = removeCourseFromCartRequestDTO;
	}

	async execute(): Promise<RemoveCourseFromCartResponseDTO> {
		const tokenRepository = this._unitOfWork
			.getRepository("TokenRepository") as TokenRepository;
		const cartRepository = this._unitOfWork
			.getRepository("CartRepository") as CartRepository;
		const courseRepository = this._unitOfWork
			.getRepository("CourseRepository") as CourseRepository;

		const { id: studentId } = await tokenRepository
			.validateStudentAuthorizationToken(
				this._removeCourseFromCartRequestDTO.authorizationToken
			);

		if (!await courseRepository
			.isCourseExists(this._removeCourseFromCartRequestDTO.courseId)
		) throw new GenericError({
			code: ErrorCodes.courseNotFound,
			error: new Error("Course not found"),
			errorCode: 404
		});

		const cartEntity = await cartRepository
			.removeCourseFromCart(
				this._removeCourseFromCartRequestDTO.courseId,
				studentId
			);

		cartEntity.courses.forEach(course => {
			const removeCourseFromCartCourseResponseDTO =
				new RemoveCourseFromCartCourseResponseDTOImpl();

			removeCourseFromCartCourseResponseDTO.category = course.category;
			removeCourseFromCartCourseResponseDTO.currency = course.currency;
			removeCourseFromCartCourseResponseDTO.description =
				course.description;
			removeCourseFromCartCourseResponseDTO.id = course.id;
			removeCourseFromCartCourseResponseDTO.image = course.image;
			removeCourseFromCartCourseResponseDTO.title = course.title;
			removeCourseFromCartCourseResponseDTO.value = course.value;

			this._removeCourseFromCartResponseDTO.courses
				.push(removeCourseFromCartCourseResponseDTO);
		});

		this._removeCourseFromCartResponseDTO.currency = cartEntity.currency;
		this._removeCourseFromCartResponseDTO.id = cartEntity.id;
		this._removeCourseFromCartResponseDTO.tax = cartEntity.tax;
		this._removeCourseFromCartResponseDTO.totalvalue =
			cartEntity.totalvalue;

		return this._removeCourseFromCartResponseDTO;
	}
}