/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Filter,
	Document
} from "mongodb";
import { 
	PaginationOptions, 
	PaginationWithIdOptions 
} from "../../mongodb-paginator";



interface MongoDBPaginator {
	find<DocType>(
		collectionName: string,
		filter: Filter<DocType>,
		options: PaginationOptions
	): Promise<{ docs: DocType[], count: number }>;
	aggregate(
		collectionName: string,
		pipeline: Document[],
		options: PaginationOptions
	): Promise<{ docs: any[], count: number }>;
	findWithIndex<DocType>(
		collectionName: string,
		filter: Filter<DocType>[],
		options: PaginationWithIdOptions
	): Promise<{ docs: DocType[], count: number }>;
	aggregateWithIndex(
		collectionName: string,
		pipeline: Document[],
		options: PaginationWithIdOptions
	): Promise<{ docs: any[], count: number }>;
}


export {
	MongoDBPaginator
};