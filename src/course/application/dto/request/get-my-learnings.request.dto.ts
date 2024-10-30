import { GetMyLearningsRequestDTO } from "./get-my-learnings.request.dto.type";


class GetMyLearningsRequestDTOImpl implements GetMyLearningsRequestDTO {
	authorizationToken: string;
}

export {
	GetMyLearningsRequestDTOImpl
};