import { faker } from "@faker-js/faker";
import mockMongoDBRepository, {
	mockAbortTransaction,
	mockCommitTransaction,
	mockStartTransaction
} from "../../mocks/mongodb-repository.mock";
import { GenericError, UnitOfWork, UnitOfWorkImpl } from "../../../src/utils";


jest.mock("@arunvaradharajalu/common.mongodb-api", () => {
	const originalModule =
		jest.requireActual<typeof import("@arunvaradharajalu/common.mongodb-api")>("@arunvaradharajalu/common.mongodb-api");

	return {
		__esModule: true,
		...originalModule,
		MongoDBRepositoryImpl: mockMongoDBRepository
	};
});

describe("Unit of work module", () => {
	let unitOfWork: UnitOfWork;

	beforeEach(() => {
		unitOfWork = new UnitOfWorkImpl();
	});

	describe("\"start\" method", () => {
		describe("Happy Path", () => {
			it("Should start mongodb transaction", async () => {
				await unitOfWork.start();

				expect(mockStartTransaction).toHaveBeenCalled();
			});
		});
	});

	describe("\"getAllRepositoryNames\" method", () => {
		describe("Happy Path", () => {
			it("Should get all repositories", () => {
				const expectedRepositories: string[] = [];

				const repositories = unitOfWork.getAllRepositoryNames();

				expect(repositories).toStrictEqual(expectedRepositories);
			});
		});
	});

	describe("\"getRepository\" method", () => {
		describe("Exception Path", () => {
			it("If provided repository does not exist, should throw error", () => {
				expect(
					() => unitOfWork.getRepository(faker.random.alpha(10))
				).toThrow(GenericError);

				expect(
					() => unitOfWork.getRepository(faker.random.alpha(10))
				).toThrow("Given repository not found");
			});
		});

		describe("Happy Path", () => {

		});
	});

	describe("\"complete\" method", () => {
		describe("Happy Path", () => {
			it("Should complete mongodb transaction", async () => {
				await unitOfWork.complete();

				expect(mockCommitTransaction).toHaveBeenCalled();
			});
		});
	});

	describe("\"dispose\" method", () => {
		describe("Happy Path", () => {
			it("Should dispose mongodb transaction", async () => {
				await unitOfWork.dispose();

				expect(mockAbortTransaction).toHaveBeenCalled();
			});
		});
	});
});