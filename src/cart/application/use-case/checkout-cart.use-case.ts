import { getOrderFactory, getPaymentFactory } from "../../../global-config";
import { AddCourseToOrderValueObject, OrderEntity, OrderRepository } from "../../../order";
import { PaymentRepository } from "../../../payment";
import { StudentRepository } from "../../../student";
import { TokenRepository } from "../../../token";
import { ErrorCodes, GenericError, UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { CartObject, CartRepository } from "../../domain";
import { CheckoutCartRequestDTO, CheckoutCartResponseDTO, CheckoutCartResponseDTOImpl } from "../dto";
import { CheckoutCartUseCase } from "./checkout-cart.use-case.type";



export class CheckoutCartUseCaseImpl implements
	CheckoutCartUseCase, CartObject {
	private _unitOfWork: UnitOfWork;
	private _checkoutCartRequestDTO:
		CheckoutCartRequestDTO;
	private _checkoutCartResponseDTO: CheckoutCartResponseDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
		this._checkoutCartResponseDTO = new CheckoutCartResponseDTOImpl();
	}

	set checkoutCartRequestDTO(checkoutCartRequestDTO: CheckoutCartRequestDTO) {
		this._checkoutCartRequestDTO = checkoutCartRequestDTO;
	}

	async execute(): Promise<CheckoutCartResponseDTO> {
		try {
			await this._unitOfWork.start();

			const orderRepository = this._unitOfWork
				.getRepository("OrderRepository") as OrderRepository;
			const cartRepository = this._unitOfWork
				.getRepository("CartRepository") as CartRepository;
			const tokenRepository = this._unitOfWork
				.getRepository("TokenRepository") as TokenRepository;
			const studentRepository = this._unitOfWork
				.getRepository("StudentRepository") as StudentRepository;
			const paymentRepository = getPaymentFactory().make("PaymentRepository") as PaymentRepository;

			const { id: studentId } = await tokenRepository
				.validateStudentAuthorizationToken(
					this._checkoutCartRequestDTO.authorizationToken
				);

			const studentValueObject = await studentRepository.get(studentId);
			if (!studentValueObject)
				throw new GenericError({
					code: ErrorCodes.studentNotFound,
					error: new Error("Student not found"),
					errorCode: 404
				});

			const cart = await cartRepository.getCart(studentId);
			if (!cart)
				throw new GenericError({
					code: ErrorCodes.cartEmpty,
					error: new Error("Cart is empty"),
					errorCode: 403
				});

			const order = getOrderFactory().make("OrderEntity") as OrderEntity;

			cart.courses.forEach(course => {
				const addCourseToOrderValueObject =
					new AddCourseToOrderValueObject();
				addCourseToOrderValueObject.id = course.id;
				addCourseToOrderValueObject.image = course.image;
				addCourseToOrderValueObject.price.currency = course.currency;
				addCourseToOrderValueObject.price.value = course.value;
				addCourseToOrderValueObject.title = course.title;

				order.addCourse(addCourseToOrderValueObject);
			});

			order.currency = cart.currency;
			order.id = orderRepository.getId();
			order.student = studentValueObject;
			order.totalAmount = cart.totalvalue;
			order.tax = cart.tax;

			await orderRepository.placeAnOrder(order);

			const { sessionId } = await paymentRepository.createCheckoutSession(
				order,
				this._checkoutCartRequestDTO.successUrl,
				this._checkoutCartRequestDTO.cancelUrl
			);

			this._checkoutCartResponseDTO.sessionId = sessionId;

			await this._unitOfWork.complete();

			return this._checkoutCartResponseDTO;
		} catch (error) {
			await this._unitOfWork.dispose();

			throw error;
		}
	}
}