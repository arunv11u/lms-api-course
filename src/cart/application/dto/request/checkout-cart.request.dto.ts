import { CheckoutCartRequestDTO } from "./checkout-cart.request.dto.type";


class CheckoutCartRequestDTOImpl implements CheckoutCartRequestDTO {
	authorizationToken: string;
	successUrl: string;
	cancelUrl: string;
}

export {
	CheckoutCartRequestDTOImpl
};