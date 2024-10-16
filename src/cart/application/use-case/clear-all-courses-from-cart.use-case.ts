import { TokenRepository } from "../../../token";
import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { CartObject, CartRepository } from "../../domain";
import { ClearAllCoursesFromCartRequestDTO } from "../dto";
import { ClearAllCoursesFromCartUseCase } from "./clear-all-courses-from-cart.use-case.type";



export class ClearAllCoursesFromCartUseCaseImpl implements
	ClearAllCoursesFromCartUseCase, CartObject {
	private _unitOfWork: UnitOfWork;
	private _clearAllCoursesFromCartRequestDTO:
		ClearAllCoursesFromCartRequestDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
	}

	set clearAllCoursesFromCartRequestDTO(
		clearAllCoursesFromCartRequestDTO: ClearAllCoursesFromCartRequestDTO
	) {
		this._clearAllCoursesFromCartRequestDTO =
			clearAllCoursesFromCartRequestDTO;
	}

	async execute(): Promise<void> {
		try {
			await this._unitOfWork.start();

			const tokenRepository = this._unitOfWork
				.getRepository("TokenRepository") as TokenRepository;
			const cartRepository = this._unitOfWork
				.getRepository("CartRepository") as CartRepository;

			const { id: studentId } = await tokenRepository
				.validateStudentAuthorizationToken(
					this._clearAllCoursesFromCartRequestDTO.authorizationToken
				);

			await cartRepository.clearAllCoursesFromCart(studentId);

			await this._unitOfWork.complete();
		} catch (error) {
			await this._unitOfWork.dispose();

			throw error;
		}
	}
}