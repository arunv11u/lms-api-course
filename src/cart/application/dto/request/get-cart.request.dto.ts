import { GetCartRequestDTO } from "./get-cart.request.dto.type";


class GetCartRequestDTOImpl implements
	GetCartRequestDTO {
	authorizationToken: string;
}

export {
	GetCartRequestDTOImpl
};