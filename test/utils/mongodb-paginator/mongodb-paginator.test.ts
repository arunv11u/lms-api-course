/* eslint-disable max-lines */
import { faker } from "@faker-js/faker";
import {
	Document,
	ObjectId
} from "mongodb";
import { 
	MongoDBPaginator, 
	MongoDBPaginatorImpl,
	PaginationOptions, 
	PaginationWithIdOptions, 
	PaginatorTypes, 
	SortTypes
} from "../../../src/utils";
import { MongoDBRepository, MongoDBRepositoryImpl, mongoDBConnect } from "@arunvaradharajalu/common.mongodb-api";



describe("MongoDB Paginator Module", () => {
	const collectionName = "users";
	let mongoDBPaginator: MongoDBPaginator;
	let mongoDBRepository: MongoDBRepository;

	beforeEach(() => {
		mongoDBRepository = new MongoDBRepositoryImpl(
			mongoDBConnect,
			mongoDBConnect.dbContext
		);
		mongoDBPaginator = new MongoDBPaginatorImpl(mongoDBRepository);
	});

	describe("\"find\" method", () => {
		describe("Happy Path", () => {
			it("Collection name, filter and paginator options provided, should return documents and their count", async () => {
				const pageIndex = 0;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.ASC;

				const users = [];
				for (let userCount = 0; userCount < 10; userCount++) {
					users.push(
						{
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationOptions = new PaginationOptions();
				paginationOptions.pageIndex = pageIndex;
				paginationOptions.pageSize = pageSize;
				paginationOptions.sortField = sortField;
				paginationOptions.sortType = sortType;

				const { docs, count } = await mongoDBPaginator.find(
					collectionName,
					{},
					paginationOptions
				);

				expect(docs.length).toBe(pageSize);
				expect(count).toBe(users.length);
			});

			it("Collection name, filter for a email and paginator options provided, should return documents and their count", async () => {
				const pageIndex = 0;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.ASC;

				const userEmail = faker.internet.email();
				const users = [{ email: userEmail }];
				for (let userCount = 0; userCount < 10; userCount++) {
					users.push(
						{
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const filter = { email: userEmail };
				const paginationOptions = new PaginationOptions();
				paginationOptions.pageIndex = pageIndex;
				paginationOptions.pageSize = pageSize;
				paginationOptions.sortField = sortField;
				paginationOptions.sortType = sortType;

				const { docs, count } = await mongoDBPaginator
					.find<{ email: string }>(
						collectionName,
						filter,
						paginationOptions
					);

				expect(docs[0].email).toBe(userEmail);
				expect(count).toBe(1);
			});

			it("Collection name, filter and sorting type is provided as descending, should return documents in descending order and their count", async () => {
				const pageIndex = 0;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.DESC;

				const users = [];
				for (let userCount = 0; userCount < 10; userCount++) {
					users.push(
						{
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationOptions = new PaginationOptions();
				paginationOptions.pageIndex = pageIndex;
				paginationOptions.pageSize = pageSize;
				paginationOptions.sortField = sortField;
				paginationOptions.sortType = sortType;

				const { docs, count } = await mongoDBPaginator
					.find<{ email: string }>(
						collectionName,
						{},
						paginationOptions
					);

				expect(docs[0].email).toBe(users[users.length - 1].email);
				expect(docs.length).toBe(pageSize);
				expect(count).toBe(users.length);
			});

			it("Collection name, filter and collation option provided, should return documents and their count", async () => {
				const pageIndex = 0;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.ASC;

				const users = [];
				for (let userCount = 0; userCount < 10; userCount++) {
					users.push(
						{
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationOptions = new PaginationOptions();
				paginationOptions.pageIndex = pageIndex;
				paginationOptions.pageSize = pageSize;
				paginationOptions.sortField = sortField;
				paginationOptions.sortType = sortType;
				paginationOptions.collationOptions = {
					locale: "en",
					strength: 1
				};

				const { docs, count } = await mongoDBPaginator.find(
					collectionName,
					{},
					paginationOptions
				);

				expect(docs.length).toBe(pageSize);
				expect(count).toBe(users.length);
			});
		});
	});

	describe("\"aggregate\" method", () => {
		describe("Happy Path", () => {
			it("Collection name, pipeline, paginator options provided, should return documents and their count", async () => {
				const pageIndex = 0;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.ASC;

				const users = [];
				for (let userCount = 0; userCount < 10; userCount++) {
					users.push(
						{
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationOptions = new PaginationOptions();
				paginationOptions.pageIndex = pageIndex;
				paginationOptions.pageSize = pageSize;
				paginationOptions.sortField = sortField;
				paginationOptions.sortType = sortType;

				const { docs, count } = await mongoDBPaginator.aggregate(
					collectionName,
					[],
					paginationOptions
				);

				expect(docs.length).toBe(pageSize);
				expect(count).toBe(users.length);
			});

			it("Collection name, pipeline for mathing a email, paginator options provided, should return documents and their count", async () => {
				const pageIndex = 0;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.ASC;

				const userEmail = faker.internet.email();
				const users = [{ email: userEmail }];
				for (let userCount = 0; userCount < 10; userCount++) {
					users.push(
						{
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const pipeline: Document[] = [
					{ $match: { $expr: { $eq: ["$email", userEmail] } } }
				];
				const paginationOptions = new PaginationOptions();
				paginationOptions.pageIndex = pageIndex;
				paginationOptions.pageSize = pageSize;
				paginationOptions.sortField = sortField;
				paginationOptions.sortType = sortType;

				const { docs, count } = await mongoDBPaginator.aggregate(
					collectionName,
					pipeline,
					paginationOptions
				);

				expect(docs[0].email).toBe(userEmail);
				expect(count).toBe(1);
			});

			it("Collection name, pipeline and sorting option is provided in descending order, should return documents and their count", async () => {
				const pageIndex = 0;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.DESC;

				const users = [];
				for (let userCount = 0; userCount < 10; userCount++) {
					users.push(
						{
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationOptions = new PaginationOptions();
				paginationOptions.pageIndex = pageIndex;
				paginationOptions.pageSize = pageSize;
				paginationOptions.sortField = sortField;
				paginationOptions.sortType = sortType;

				const { docs, count } = await mongoDBPaginator.aggregate(
					collectionName,
					[],
					paginationOptions
				);

				expect(docs[0].email).toBe(users[users.length - 1].email);
				expect(docs.length).toBe(pageSize);
				expect(count).toBe(users.length);
			});

			it("Collection name, pipeline with projection query provided, should return the transformed documents and their count", async () => {
				const pageIndex = 0;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.ASC;

				const users = [];
				for (let userCount = 0; userCount < 10; userCount++) {
					users.push(
						{
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationOptions = new PaginationOptions();
				paginationOptions.pageIndex = pageIndex;
				paginationOptions.pageSize = pageSize;
				paginationOptions.sortField = sortField;
				paginationOptions.sortType = sortType;

				const { docs, count } = await mongoDBPaginator.aggregate(
					collectionName,
					[
						{ $project: { emailAddress: "$email" } }
					],
					paginationOptions
				);

				expect(docs[0].emailAddress).toBe(users[0].email);
				expect(docs.length).toBe(pageSize);
				expect(count).toBe(users.length);
			});

			it("Collection name, pipeline and collation option provided, should return documents and their count", async () => {
				const pageIndex = 0;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.ASC;

				const users = [];
				for (let userCount = 0; userCount < 10; userCount++) {
					users.push(
						{
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationOptions = new PaginationOptions();
				paginationOptions.pageIndex = pageIndex;
				paginationOptions.pageSize = pageSize;
				paginationOptions.sortField = sortField;
				paginationOptions.sortType = sortType;
				paginationOptions.collationOptions = {
					locale: "en",
					strength: 1
				};

				const { docs, count } = await mongoDBPaginator.aggregate(
					collectionName,
					[],
					paginationOptions
				);

				expect(docs.length).toBe(pageSize);
				expect(count).toBe(users.length);
			});
		});
	});

	describe("\"findWithIndex\" method", () => {
		describe("Happy Path", () => {
			it("Collection name, filter and paginator with index options provided, should return documents and their count", async () => {
				const paginatorType = PaginatorTypes.FORWARD;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.ASC;

				const userEmail = faker.internet.email();
				const users = [{ _id: new ObjectId(), email: userEmail }];
				for (let userCount = 0; userCount < 10; userCount++) {
					users.push(
						{
							_id: new ObjectId(),
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationWithIdOptions = new PaginationWithIdOptions();
				paginationWithIdOptions.type = paginatorType;
				paginationWithIdOptions.pageSize = pageSize;
				paginationWithIdOptions.sortField = sortField;
				paginationWithIdOptions.sortType = sortType;

				const { docs, count } = await mongoDBPaginator.findWithIndex(
					collectionName,
					[],
					paginationWithIdOptions
				);

				expect(docs.length).toBe(pageSize);
				expect(count).toBe(users.length);
			});

			it("Id provided to go forward and sort type is ascending, should return documents greater than the value and total count", async () => {
				const paginatorType = PaginatorTypes.FORWARD;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.ASC;

				const userEmail = faker.internet.email();
				const users = [];
				for (let userCount = 0; userCount < 10; userCount++) {
					if (userCount === 9) {
						const id = new ObjectId();
						users.push(
							{ _id: id, email: userEmail }
						);
					}

					users.push(
						{
							_id: new ObjectId(),
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationWithIdOptions = new PaginationWithIdOptions();
				paginationWithIdOptions.type = paginatorType;
				paginationWithIdOptions.pageSize = pageSize;
				paginationWithIdOptions.sortField = sortField;
				paginationWithIdOptions.sortType = sortType;
				paginationWithIdOptions.id = users[9]._id.toString();

				const { docs, count } = await mongoDBPaginator.findWithIndex(
					collectionName,
					[],
					paginationWithIdOptions
				);

				expect(docs.length).toBe(1);
				expect(count).toBe(users.length);
			});

			it("Id provided to go forward, sort type is ascending, sort field is email and sort field value is also provided, should return documents greater than the value and total count", async () => {
				const paginatorType = PaginatorTypes.FORWARD;
				const pageSize = 5;
				const sortField = "email";
				const sortType: SortTypes = SortTypes.ASC;

				const userEmail = "cc@gmail.com";
				const users = [
					{
						_id: new ObjectId(),
						email: "aa@gmail.com"
					},
					{
						_id: new ObjectId(),
						email: "ba@gmail.com"
					},
					{
						_id: new ObjectId(),
						email: userEmail
					}
				];
				await mongoDBRepository.addRange(collectionName, users);

				const paginationWithIdOptions = new PaginationWithIdOptions();
				paginationWithIdOptions.type = paginatorType;
				paginationWithIdOptions.pageSize = pageSize;
				paginationWithIdOptions.sortField = sortField;
				paginationWithIdOptions.sortFieldValue = userEmail;
				paginationWithIdOptions.sortType = sortType;
				paginationWithIdOptions.id = users[1]._id.toString();

				const { docs, count } = await mongoDBPaginator.findWithIndex(
					collectionName,
					[],
					paginationWithIdOptions
				);

				expect(docs.length).toBe(1);
				expect(count).toBe(users.length);
			});

			it("Id provided to go forward and sort type is descending, should return documents lesser than the value and total count", async () => {
				const paginatorType = PaginatorTypes.FORWARD;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.DESC;

				const userEmail = faker.internet.email();
				const users = [];
				for (let userCount = 0; userCount < 10; userCount++) {
					if (userCount === 1) {
						const id = new ObjectId();
						users.push(
							{ _id: id, email: userEmail }
						);
					}

					users.push(
						{
							_id: new ObjectId(),
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationWithIdOptions = new PaginationWithIdOptions();
				paginationWithIdOptions.type = paginatorType;
				paginationWithIdOptions.pageSize = pageSize;
				paginationWithIdOptions.sortField = sortField;
				paginationWithIdOptions.sortType = sortType;
				paginationWithIdOptions.id = users[1]._id.toString();

				const { docs, count } = await mongoDBPaginator.findWithIndex(
					collectionName,
					[],
					paginationWithIdOptions
				);

				expect(docs.length).toBe(1);
				expect(count).toBe(users.length);
			});

			it("Id provided to go forward, sort type is descending, sort field is email, should return documents lesser than the value and total count", async () => {
				const paginatorType = PaginatorTypes.FORWARD;
				const pageSize = 5;
				const sortField = "email";
				const sortType: SortTypes = SortTypes.DESC;

				const userEmail = faker.internet.email();
				const users = [];
				for (let userCount = 0; userCount < 10; userCount++) {
					if (userCount === 1) {
						const id = new ObjectId();
						users.push(
							{ _id: id, email: userEmail }
						);
					}

					users.push(
						{
							_id: new ObjectId(),
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationWithIdOptions = new PaginationWithIdOptions();
				paginationWithIdOptions.type = paginatorType;
				paginationWithIdOptions.pageSize = pageSize;
				paginationWithIdOptions.sortField = sortField;
				paginationWithIdOptions.sortType = sortType;
				paginationWithIdOptions.id = users[1]._id.toString();

				const { docs, count } = await mongoDBPaginator.findWithIndex(
					collectionName,
					[],
					paginationWithIdOptions
				);

				expect(docs.length).toBe(1);
				expect(count).toBe(users.length);
			});

			it("Id provided to go backward and sort type is ascending, should return documents lesser than the value and total count", async () => {
				const paginatorType = PaginatorTypes.BACKWARD;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.ASC;

				const userEmail = faker.internet.email();
				const users = [];
				for (let userCount = 0; userCount < 10; userCount++) {
					if (userCount === 1) {
						const id = new ObjectId();
						users.push(
							{ _id: id, email: userEmail }
						);
					}

					users.push(
						{
							_id: new ObjectId(),
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationWithIdOptions = new PaginationWithIdOptions();
				paginationWithIdOptions.type = paginatorType;
				paginationWithIdOptions.pageSize = pageSize;
				paginationWithIdOptions.sortField = sortField;
				paginationWithIdOptions.sortType = sortType;
				paginationWithIdOptions.id = users[1]._id.toString();

				const { docs, count } = await mongoDBPaginator.findWithIndex(
					collectionName,
					[],
					paginationWithIdOptions
				);

				expect(docs.length).toBe(1);
				expect(count).toBe(users.length);
			});

			it("Id provided to go backward, sort type is ascending and sort field is email, should return documents lesser than the value and total count", async () => {
				const paginatorType = PaginatorTypes.BACKWARD;
				const pageSize = 5;
				const sortField = "email";
				const sortType: SortTypes = SortTypes.ASC;

				const userEmail = faker.internet.email();
				const users = [];
				for (let userCount = 0; userCount < 10; userCount++) {
					if (userCount === 1) {
						const id = new ObjectId();
						users.push(
							{ _id: id, email: userEmail }
						);
					}

					users.push(
						{
							_id: new ObjectId(),
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationWithIdOptions = new PaginationWithIdOptions();
				paginationWithIdOptions.type = paginatorType;
				paginationWithIdOptions.pageSize = pageSize;
				paginationWithIdOptions.sortField = sortField;
				paginationWithIdOptions.sortType = sortType;
				paginationWithIdOptions.id = users[1]._id.toString();

				const { docs, count } = await mongoDBPaginator.findWithIndex(
					collectionName,
					[],
					paginationWithIdOptions
				);

				expect(docs.length).toBe(1);
				expect(count).toBe(users.length);
			});

			it("Id provided to go backward and sort type is descending, should return documents greater than the value and total count", async () => {
				const paginatorType = PaginatorTypes.BACKWARD;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.DESC;

				const userEmail = faker.internet.email();
				const users = [];
				for (let userCount = 0; userCount < 10; userCount++) {
					if (userCount === 9) {
						const id = new ObjectId();
						users.push(
							{ _id: id, email: userEmail }
						);
					}

					users.push(
						{
							_id: new ObjectId(),
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationWithIdOptions = new PaginationWithIdOptions();
				paginationWithIdOptions.type = paginatorType;
				paginationWithIdOptions.pageSize = pageSize;
				paginationWithIdOptions.sortField = sortField;
				paginationWithIdOptions.sortType = sortType;
				paginationWithIdOptions.id = users[9]._id.toString();

				const { docs, count } = await mongoDBPaginator.findWithIndex(
					collectionName,
					[],
					paginationWithIdOptions
				);

				expect(docs.length).toBe(1);
				expect(count).toBe(users.length);
			});

			it("Id provided to go backward, sort type is descending and sort field is email, should return documents greater than the value and total count", async () => {
				const paginatorType = PaginatorTypes.BACKWARD;
				const pageSize = 5;
				const sortField = "email";
				const sortType: SortTypes = SortTypes.DESC;

				const userEmail = faker.internet.email();
				const users = [];
				for (let userCount = 0; userCount < 10; userCount++) {
					if (userCount === 9) {
						const id = new ObjectId();
						users.push(
							{ _id: id, email: userEmail }
						);
					}

					users.push(
						{
							_id: new ObjectId(),
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationWithIdOptions = new PaginationWithIdOptions();
				paginationWithIdOptions.type = paginatorType;
				paginationWithIdOptions.pageSize = pageSize;
				paginationWithIdOptions.sortField = sortField;
				paginationWithIdOptions.sortType = sortType;
				paginationWithIdOptions.id = users[9]._id.toString();

				const { docs, count } = await mongoDBPaginator.findWithIndex(
					collectionName,
					[],
					paginationWithIdOptions
				);

				expect(docs.length).toBe(1);
				expect(count).toBe(users.length);
			});

			it("Collection name, filter, paginator with index options and collation options provided, should return documents and their count", async () => {
				const paginatorType = PaginatorTypes.FORWARD;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.ASC;

				const userEmail = faker.internet.email();
				const users = [{ _id: new ObjectId(), email: userEmail }];
				for (let userCount = 0; userCount < 10; userCount++) {
					users.push(
						{
							_id: new ObjectId(),
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationWithIdOptions = new PaginationWithIdOptions();
				paginationWithIdOptions.type = paginatorType;
				paginationWithIdOptions.pageSize = pageSize;
				paginationWithIdOptions.sortField = sortField;
				paginationWithIdOptions.sortType = sortType;
				paginationWithIdOptions.collationOptions = {
					locale: "en",
					strength: 1
				};

				const { docs, count } = await mongoDBPaginator.findWithIndex(
					collectionName,
					[],
					paginationWithIdOptions
				);

				expect(docs.length).toBe(pageSize);
				expect(count).toBe(users.length);
			});

			it("Collection name, filter for email and paginator with index options provided, should return documents and their count", async () => {
				const paginatorType = PaginatorTypes.FORWARD;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.ASC;

				const userEmail = faker.internet.email();
				const users = [{ _id: new ObjectId(), email: userEmail }];
				for (let userCount = 0; userCount < 10; userCount++) {
					users.push(
						{
							_id: new ObjectId(),
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationWithIdOptions = new PaginationWithIdOptions();
				paginationWithIdOptions.type = paginatorType;
				paginationWithIdOptions.pageSize = pageSize;
				paginationWithIdOptions.sortField = sortField;
				paginationWithIdOptions.sortType = sortType;

				const { docs, count } = await mongoDBPaginator
					.findWithIndex<{ email: string }>(
						collectionName,
						[
							{ email: userEmail }
						],
						paginationWithIdOptions
					);

				expect(docs[0].email).toBe(userEmail);
				expect(count).toBe(1);
			});
		});
	});

	describe("\"aggregateWithIndex\" method", () => {
		describe("Happy Path", () => {
			it("Collection name, pipeline and paginator with index options provided, should return documents and their count", async () => {
				const paginatorType = PaginatorTypes.FORWARD;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.ASC;

				const userEmail = faker.internet.email();
				const users = [{ _id: new ObjectId(), email: userEmail }];
				for (let userCount = 0; userCount < 10; userCount++) {
					users.push(
						{
							_id: new ObjectId(),
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationWithIdOptions = new PaginationWithIdOptions();
				paginationWithIdOptions.type = paginatorType;
				paginationWithIdOptions.pageSize = pageSize;
				paginationWithIdOptions.sortField = sortField;
				paginationWithIdOptions.sortType = sortType;

				const { docs, count } = await mongoDBPaginator
					.aggregateWithIndex(
						collectionName,
						[],
						paginationWithIdOptions
					);

				expect(docs.length).toBe(pageSize);
				expect(count).toBe(users.length);
			});

			it("Id provided to go forward and sort type is ascending, should return documents greater than the value and total count", async () => {
				const paginatorType = PaginatorTypes.FORWARD;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.ASC;

				const userEmail = faker.internet.email();
				const users = [];
				for (let userCount = 0; userCount < 10; userCount++) {
					if (userCount === 1) {
						const id = new ObjectId();
						users.push(
							{ _id: id, email: userEmail }
						);
					}

					users.push(
						{
							_id: new ObjectId(),
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationWithIdOptions = new PaginationWithIdOptions();
				paginationWithIdOptions.type = paginatorType;
				paginationWithIdOptions.pageSize = pageSize;
				paginationWithIdOptions.sortField = sortField;
				paginationWithIdOptions.sortType = sortType;
				paginationWithIdOptions.id = users[9]._id.toString();

				const { docs, count } = await mongoDBPaginator
					.aggregateWithIndex(
						collectionName,
						[],
						paginationWithIdOptions
					);

				expect(docs.length).toBe(1);
				expect(count).toBe(users.length);
			});

			it("Id provided to go forward, sort type is ascending and sort field is email, should return documents greater than the value and total count", async () => {
				const paginatorType = PaginatorTypes.FORWARD;
				const pageSize = 5;
				const sortField = "email";
				const sortType: SortTypes = SortTypes.ASC;

				const userEmail = "cc@gmail.com";
				const users = [
					{
						_id: new ObjectId(),
						email: "aa@gmail.com"
					},
					{
						_id: new ObjectId(),
						email: "ba@gmail.com"
					},
					{
						_id: new ObjectId(),
						email: userEmail
					}
				];
				await mongoDBRepository.addRange(collectionName, users);

				const paginationWithIdOptions = new PaginationWithIdOptions();
				paginationWithIdOptions.type = paginatorType;
				paginationWithIdOptions.pageSize = pageSize;
				paginationWithIdOptions.sortField = sortField;
				paginationWithIdOptions.sortType = sortType;
				paginationWithIdOptions.sortFieldValue = userEmail;
				paginationWithIdOptions.id = users[1]._id.toString();

				const { docs, count } = await mongoDBPaginator
					.aggregateWithIndex(
						collectionName,
						[],
						paginationWithIdOptions
					);

				expect(docs.length).toBe(1);
				expect(count).toBe(users.length);
			});

			it("Id provided to go forward and sort type is descending, should return documents lesser than the value and total count", async () => {
				const paginatorType = PaginatorTypes.FORWARD;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.DESC;

				const userEmail = faker.internet.email();
				const users = [];
				for (let userCount = 0; userCount < 10; userCount++) {
					if (userCount === 1) {
						const id = new ObjectId();
						users.push(
							{ _id: id, email: userEmail }
						);
					}

					users.push(
						{
							_id: new ObjectId(),
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationWithIdOptions = new PaginationWithIdOptions();
				paginationWithIdOptions.type = paginatorType;
				paginationWithIdOptions.pageSize = pageSize;
				paginationWithIdOptions.sortField = sortField;
				paginationWithIdOptions.sortType = sortType;
				paginationWithIdOptions.id = users[1]._id.toString();

				const { docs, count } = await mongoDBPaginator
					.aggregateWithIndex(
						collectionName,
						[],
						paginationWithIdOptions
					);

				expect(docs.length).toBe(1);
				expect(count).toBe(users.length);
			});

			it("Id provided to go forward, sort type is descending and sort field is email, should return documents lesser than the value and total count", async () => {
				const paginatorType = PaginatorTypes.FORWARD;
				const pageSize = 5;
				const sortField = "email";
				const sortType: SortTypes = SortTypes.DESC;

				const userEmail = faker.internet.email();
				const users = [];
				for (let userCount = 0; userCount < 10; userCount++) {
					if (userCount === 1) {
						const id = new ObjectId();
						users.push(
							{ _id: id, email: userEmail }
						);
					}

					users.push(
						{
							_id: new ObjectId(),
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationWithIdOptions = new PaginationWithIdOptions();
				paginationWithIdOptions.type = paginatorType;
				paginationWithIdOptions.pageSize = pageSize;
				paginationWithIdOptions.sortField = sortField;
				paginationWithIdOptions.sortType = sortType;
				paginationWithIdOptions.id = users[1]._id.toString();

				const { docs, count } = await mongoDBPaginator
					.aggregateWithIndex(
						collectionName,
						[],
						paginationWithIdOptions
					);

				expect(docs.length).toBe(1);
				expect(count).toBe(users.length);
			});

			it("Id provided to go backward and sort type is ascending, should return documents lesser than the value and total count", async () => {
				const paginatorType = PaginatorTypes.BACKWARD;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.ASC;

				const userEmail = faker.internet.email();
				const users = [];
				for (let userCount = 0; userCount < 10; userCount++) {
					if (userCount === 1) {
						const id = new ObjectId();
						users.push(
							{ _id: id, email: userEmail }
						);
					}

					users.push(
						{
							_id: new ObjectId(),
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationWithIdOptions = new PaginationWithIdOptions();
				paginationWithIdOptions.type = paginatorType;
				paginationWithIdOptions.pageSize = pageSize;
				paginationWithIdOptions.sortField = sortField;
				paginationWithIdOptions.sortType = sortType;
				paginationWithIdOptions.id = users[1]._id.toString();

				const { docs, count } = await mongoDBPaginator
					.aggregateWithIndex(
						collectionName,
						[],
						paginationWithIdOptions
					);

				expect(docs.length).toBe(1);
				expect(count).toBe(users.length);
			});

			it("Id provided to go backward, sort type is ascending and sort field is email, should return documents lesser than the value and total count", async () => {
				const paginatorType = PaginatorTypes.BACKWARD;
				const pageSize = 5;
				const sortField = "email";
				const sortType: SortTypes = SortTypes.ASC;

				const userEmail = faker.internet.email();
				const users = [];
				for (let userCount = 0; userCount < 10; userCount++) {
					if (userCount === 1) {
						const id = new ObjectId();
						users.push(
							{ _id: id, email: userEmail }
						);
					}

					users.push(
						{
							_id: new ObjectId(),
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationWithIdOptions = new PaginationWithIdOptions();
				paginationWithIdOptions.type = paginatorType;
				paginationWithIdOptions.pageSize = pageSize;
				paginationWithIdOptions.sortField = sortField;
				paginationWithIdOptions.sortType = sortType;
				paginationWithIdOptions.id = users[1]._id.toString();

				const { docs, count } = await mongoDBPaginator
					.aggregateWithIndex(
						collectionName,
						[],
						paginationWithIdOptions
					);

				expect(docs.length).toBe(1);
				expect(count).toBe(users.length);
			});

			it("Id provided to go backward and sort type is descending, should return documents greater than the value and total count", async () => {
				const paginatorType = PaginatorTypes.BACKWARD;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.DESC;

				const userEmail = faker.internet.email();
				const users = [];
				for (let userCount = 0; userCount < 10; userCount++) {
					if (userCount === 9) {
						const id = new ObjectId();
						users.push(
							{ _id: id, email: userEmail }
						);
					}

					users.push(
						{
							_id: new ObjectId(),
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationWithIdOptions = new PaginationWithIdOptions();
				paginationWithIdOptions.type = paginatorType;
				paginationWithIdOptions.pageSize = pageSize;
				paginationWithIdOptions.sortField = sortField;
				paginationWithIdOptions.sortType = sortType;
				paginationWithIdOptions.id = users[9]._id.toString();

				const { docs, count } = await mongoDBPaginator
					.aggregateWithIndex(
						collectionName,
						[],
						paginationWithIdOptions
					);

				expect(docs.length).toBe(1);
				expect(count).toBe(users.length);
			});

			it("Id provided to go backward, sort type is descending and sort field is email, should return documents greater than the value and total count", async () => {
				const paginatorType = PaginatorTypes.BACKWARD;
				const pageSize = 5;
				const sortField = "email";
				const sortType: SortTypes = SortTypes.DESC;

				const userEmail = faker.internet.email();
				const users = [];
				for (let userCount = 0; userCount < 10; userCount++) {
					if (userCount === 9) {
						const id = new ObjectId();
						users.push(
							{ _id: id, email: userEmail }
						);
					}

					users.push(
						{
							_id: new ObjectId(),
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationWithIdOptions = new PaginationWithIdOptions();
				paginationWithIdOptions.type = paginatorType;
				paginationWithIdOptions.pageSize = pageSize;
				paginationWithIdOptions.sortField = sortField;
				paginationWithIdOptions.sortType = sortType;
				paginationWithIdOptions.id = users[9]._id.toString();

				const { docs, count } = await mongoDBPaginator
					.aggregateWithIndex(
						collectionName,
						[],
						paginationWithIdOptions
					);

				expect(docs.length).toBe(1);
				expect(count).toBe(users.length);
			});

			it("Collection name, pipeline, paginator with index options and collation options provided, should return documents and their count", async () => {
				const paginatorType = PaginatorTypes.FORWARD;
				const pageSize = 5;
				const sortField = "_id";
				const sortType: SortTypes = SortTypes.ASC;

				const userEmail = faker.internet.email();
				const users = [{ _id: new ObjectId(), email: userEmail }];
				for (let userCount = 0; userCount < 10; userCount++) {
					users.push(
						{
							_id: new ObjectId(),
							email: faker.internet.email()
						}
					);
				}
				await mongoDBRepository.addRange(collectionName, users);

				const paginationWithIdOptions = new PaginationWithIdOptions();
				paginationWithIdOptions.type = paginatorType;
				paginationWithIdOptions.pageSize = pageSize;
				paginationWithIdOptions.sortField = sortField;
				paginationWithIdOptions.sortType = sortType;
				paginationWithIdOptions.collationOptions = {
					locale: "en",
					strength: 1
				};

				const { docs, count } = await mongoDBPaginator
					.aggregateWithIndex(
						collectionName,
						[],
						paginationWithIdOptions
					);

				expect(docs.length).toBe(pageSize);
				expect(count).toBe(users.length);
			});
		});
	});
});
