import { MongoDBRepositoryImpl } from "@arunvaradharajalu/common.mongodb-api";
import { getMongoDBRepository } from "../../../src/utils";




describe("Helper Module", () => {

	describe("\"getMongoDBRepository\" method", () => {
		describe("Happy Path", () => {
			it("Should return mongodb repository", () => {
				const mongoDBRepository = getMongoDBRepository();

				expect(mongoDBRepository).toBeInstanceOf(MongoDBRepositoryImpl);
			});
		});
	});
});