/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines */
/* eslint-disable max-depth */
import {
	Filter,
	Sort,
	Document,
	ObjectId
} from "mongodb";
import {
	MongoDBPaginator,
	PaginatorTypes,
	SortTypes
} from "../types";
import {
	PaginationOptions,
	PaginationWithIdOptions
} from "./";
import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";



export class MongoDBPaginatorImpl implements MongoDBPaginator {
	private _mongodbRepository: MongoDBRepository;

	constructor(mongodbRepository: MongoDBRepository) {
		this._mongodbRepository = mongodbRepository;
	}

	async find<DocType>(
		collectionName: string,
		filter: Filter<DocType>,
		options: PaginationOptions
	): Promise<{ docs: DocType[], count: number }> {
		const sort: Sort = {};
		const skipCount = options.pageIndex * options.pageSize;

		if (options.sortType === SortTypes.ASC)
			sort[options.sortField] = 1;
		else sort[options.sortField] = -1;


		const docs = await this._mongodbRepository.find(
			collectionName,
			filter,
			{
				sort,
				skip: skipCount,
				limit: options.pageSize,
				collation: options.collationOptions ?
					options.collationOptions : undefined
			}
		) as DocType[];

		const count = await this._mongodbRepository
			.countDocuments(
				collectionName,
				filter
			);

		return { docs, count };
	}

	async aggregate(
		collectionName: string,
		pipeline: Document[],
		options: PaginationOptions
	): Promise<{ docs: any[], count: number }> {

		const sort: { $sort: Record<string, number> } = { $sort: {} };
		const skipCount = options.pageIndex * options.pageSize;
		if (options.sortType === SortTypes.ASC) sort["$sort"][options.sortField] = 1;
		else sort["$sort"][options.sortField] = -1;


		const docsSnapshotQuery = [];
		if (options.pageSize)
			docsSnapshotQuery.push(
				{ $skip: skipCount },
				{ $limit: options.pageSize }
			);

		let projectionQuery: Document[] = [];
		if (pipeline.length &&
			((pipeline[pipeline.length - 1])).$project
		)
			projectionQuery = pipeline.splice(pipeline.length - 1, 1);

		const pipelineQuery = [
			...pipeline,
			{ ...sort },
			...projectionQuery,
			{
				$facet: {
					docs: [
						...docsSnapshotQuery,
						{ $group: { _id: null, docsArr: { $push: "$$ROOT" } } },
					],
					count: [
						{ $group: { _id: null, count: { $sum: 1 } } }
					],
				}
			},
			{
				$project: {
					docs: {
						$ifNull: [
							{
								$arrayElemAt: ["$docs.docsArr", 0],
							},
							[],
						],
					},
					count: {
						$ifNull: [
							{ $arrayElemAt: ["$count.count", 0] },
							0
						]
					},
				}
			},
		];

		const documentSnapshots = await this._mongodbRepository
			.aggregate(
				collectionName,
				pipelineQuery,
				{
					collation: options.collationOptions ?
						options.collationOptions : undefined
				}
			);
		const docs = documentSnapshots[0].docs;
		const count = documentSnapshots[0].count;

		return { docs, count };
	}

	async findWithIndex<DocType>(
		collectionName: string,
		filter: Filter<DocType>[],
		options: PaginationWithIdOptions
	): Promise<{ docs: DocType[], count: number }> {
		const sort: Sort = {};
		const query: any[] = [];

		if (options.type === PaginatorTypes.FORWARD) {
			if (options.sortType === SortTypes.ASC) {
				if (options.sortField !== "_id") {
					sort[options.sortField] = 1;
					sort["_id"] = 1;
				} else sort["_id"] = 1;
			} else {
				if (options.sortField !== "_id") {
					sort[options.sortField] = -1;
					sort["_id"] = -1;
				} else sort["_id"] = -1;
			}
		} else {
			if (options.sortType === SortTypes.ASC) {
				if (options.sortField !== "_id") {
					sort[options.sortField] = -1;
					sort["_id"] = -1;
				} else sort["_id"] = -1;
			} else {
				if (options.sortField !== "_id") {
					sort[options.sortField] = 1;
					sort["_id"] = 1;
				} else sort["_id"] = 1;
			}
		}

		if (
			options.sortField &&
			options.sortFieldValue &&
			options.sortFieldValue !== "undefined" &&
			options.sortFieldValue !== "null"
		) {
			const sortFieldObj: Record<string, any> = {};
			sortFieldObj[options.sortField] = { $eq: options.sortFieldValue };
			query.push({ $or: [{ $and: [sortFieldObj] }] });
		}

		let operator: "$gt" | "$lt";
		if (options.type === PaginatorTypes.FORWARD) {
			if (options.sortType === SortTypes.ASC) operator = "$gt";
			else operator = "$lt";
		} else {
			if (options.sortType === SortTypes.ASC) operator = "$lt";
			else operator = "$gt";
		}


		if (options.id) {
			const _matchQuery: Record<string, any> = { _id: {} };
			_matchQuery._id[operator] = new ObjectId(options.id);
			if (
				options.sortField &&
				options.sortFieldValue &&
				options.sortFieldValue !== "undefined" &&
				options.sortFieldValue !== "null"
			) {
				const _matchQueryObj: Record<string, any> = {};
				_matchQueryObj[options["sortField"]] = {};
				_matchQueryObj[options["sortField"]][operator] =
					options.sortFieldValue;
				query[0].$or.unshift(_matchQueryObj);
				query[0].$or[1].$and.push(_matchQuery);
			} else query.push(_matchQuery);
		}


		let finalQuery: Record<string, any> = {};
		if ([...query, ...filter].length)
			finalQuery = { $and: [...query, ...filter] };


		const docs = await this._mongodbRepository.find(
			collectionName,
			finalQuery,
			{
				sort,
				limit: options.pageSize,
				collation: options.collationOptions ?
					options.collationOptions : undefined
			}
		) as DocType[];

		if (options.type === PaginatorTypes.BACKWARD)
			docs.reverse();

		let countFinalQuery: Record<string, any> = {};
		if (filter.length) countFinalQuery = { $and: [...filter] };

		const count = await this._mongodbRepository.countDocuments(
			collectionName,
			countFinalQuery
		);

		return { docs, count };
	}

	async aggregateWithIndex(
		collectionName: string,
		pipeline: Document[],
		options: PaginationWithIdOptions
	): Promise<{ docs: any[], count: number }> {
		const sort: { $sort: Record<string, any> } = { $sort: {} };
		const query: any[] = [];


		if (options.type === PaginatorTypes.FORWARD) {
			if (options.sortType === SortTypes.ASC) {
				if (options.sortField !== "_id") {
					sort["$sort"][options.sortField] = 1;
					sort["$sort"]["_id"] = 1;
				} else sort["$sort"]["_id"] = 1;
			} else {
				if (options.sortField !== "_id") {
					sort["$sort"][options.sortField] = -1;
					sort["$sort"]["_id"] = -1;
				} else sort["$sort"]["_id"] = -1;
			}
		} else {
			if (options.sortType === SortTypes.ASC) {
				if (options.sortField !== "_id") {
					sort["$sort"][options.sortField] = -1;
					sort["$sort"]["_id"] = -1;
				} else sort["$sort"]["_id"] = -1;
			} else {
				if (options.sortField !== "_id") {
					sort["$sort"][options.sortField] = 1;
					sort["$sort"]["_id"] = 1;
				} else sort["$sort"]["_id"] = 1;
			}
		}

		if (
			options.sortField &&
			options.sortFieldValue &&
			options.sortFieldValue !== "undefined" &&
			options.sortFieldValue !== "null"
		) {
			query.push({
				$or: [
					{
						$and: [
							{
								$eq: [
									`$${options["sortField"]}`,
									options.sortFieldValue
								]
							},
						],
					},
				],
			});
		}

		let operator: "$gt" | "$lt";
		if (options.type === PaginatorTypes.FORWARD) {
			if (options.sortType === SortTypes.ASC) operator = "$gt";
			else operator = "$lt";
		} else {
			if (options.sortType === SortTypes.ASC) operator = "$lt";
			else operator = "$gt";
		}


		if (options.id) {
			const _matchQuery: Record<string, any> = {};
			_matchQuery[operator] = [
				"$_id",
				new ObjectId(options.id)
			];

			if (
				options.sortField &&
				options.sortFieldValue &&
				options.sortFieldValue !== "undefined" &&
				options.sortFieldValue !== "null"
			) {
				const _matchQueryObj: Record<string, any> = {};
				_matchQueryObj[operator] = [
					`$${options["sortField"]}`,
					options.sortFieldValue
				];
				query[0].$or.unshift(_matchQueryObj);
				query[0].$or[1].$and.push(_matchQuery);
			} else query.push(_matchQuery);
		}


		const pipelineQuery = [];
		const docsSnapshotQuery = [];
		if (options.pageSize)
			docsSnapshotQuery.push({ $limit: options.pageSize });

		pipelineQuery.push(
			...pipeline,
			{ ...sort },
			{
				$facet: {
					docs: [
						{ $match: { $expr: { $and: [...query] } } },
						...docsSnapshotQuery,
						{ $group: { _id: null, docsArr: { $push: "$$ROOT" } } },
					],
					count: [{ $group: { _id: null, count: { $sum: 1 } } }],
				},
			},
			{
				$project: {
					docs: {
						$ifNull: [
							{
								$arrayElemAt: ["$docs.docsArr", 0],
							},
							[],
						],
					},
					count: { $ifNull: [{ $arrayElemAt: ["$count.count", 0] }, 0] },
				},
			}
		);


		const documentSnapshots = await this._mongodbRepository
			.aggregate(
				collectionName,
				pipelineQuery,
				{
					collation: options.collationOptions ?
						options.collationOptions : undefined
				}
			);

		if (options.type === PaginatorTypes.BACKWARD)
			documentSnapshots[0].docs.reverse();

		const docs = documentSnapshots[0].docs;
		const count = documentSnapshots[0].count;

		return { docs, count };
	}
}
