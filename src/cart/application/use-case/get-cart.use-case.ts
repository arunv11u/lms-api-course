import { TokenRepository } from "../../../token";
import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { CartObject, CartRepository } from "../../domain";
import { 
	GetCartCourseResponseDTOImpl, 
	GetCartRequestDTO, 
	GetCartResponseDTO, 
	GetCartResponseDTOImpl 
} from "../dto";
import { GetCartUseCase } from "./get-cart.use-case.type";



export class GetCartUseCaseImpl implements
	GetCartUseCase, CartObject {
	private _unitOfWork: UnitOfWork;
	private _getCartRequestDTO:
		GetCartRequestDTO;
	private _getCartResponseDTO:
		GetCartResponseDTO | null = null;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
	}

	set getCartRequestDTO(getCartRequestDTO: GetCartRequestDTO) {
		this._getCartRequestDTO = getCartRequestDTO;
	}

	async execute(): Promise<GetCartResponseDTO | null> {
		const tokenRepository = this._unitOfWork
			.getRepository("TokenRepository") as TokenRepository;
		const cartRepository = this._unitOfWork
			.getRepository("CartRepository") as CartRepository;

		const { id: studentId } = await tokenRepository
			.validateStudentAuthorizationToken(
				this._getCartRequestDTO.authorizationToken
			);

		const cartEntity = await cartRepository
			.getCart(
				studentId
			);

		if (cartEntity) {
			this._getCartResponseDTO =
				new GetCartResponseDTOImpl();

			cartEntity.courses.forEach(course => {
				const getCartCourseResponseDTO =
					new GetCartCourseResponseDTOImpl();

				getCartCourseResponseDTO
					.category = course.category;
				getCartCourseResponseDTO
					.currency = course.currency;
				getCartCourseResponseDTO.description =
					course.description;
				getCartCourseResponseDTO.id = course.id;
				getCartCourseResponseDTO.image = course.image;
				getCartCourseResponseDTO.title = course.title;
				getCartCourseResponseDTO.value = course.value;

				this._getCartResponseDTO!.courses
					.push(getCartCourseResponseDTO);
			});

			this._getCartResponseDTO
				.currency = cartEntity.currency;
			this._getCartResponseDTO.id = cartEntity.id;
			this._getCartResponseDTO.tax = cartEntity.tax;
			this._getCartResponseDTO.totalvalue =
				cartEntity.totalvalue;
		}

		return this._getCartResponseDTO;
	}
}