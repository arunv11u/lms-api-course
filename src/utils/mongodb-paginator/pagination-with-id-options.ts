import {
	CollationOptions
} from "mongodb";
import {
	PaginatorTypes,
	SortTypes
} from "../types";



export class PaginationWithIdOptions {
	type: PaginatorTypes = PaginatorTypes.FORWARD;
	pageSize = 5;
	sortType: SortTypes = SortTypes.ASC;
	sortField = "_id";
	sortFieldValue: string | null = null;
	id: string | null = null;
	collationOptions: CollationOptions | null = null;
}
