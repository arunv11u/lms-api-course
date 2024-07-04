import {
	CollationOptions
} from "mongodb";
import {
	SortTypes
} from "../types";



export class PaginationOptions {
	pageIndex = 0;
	pageSize = 10;
	sortType: SortTypes = SortTypes.DESC;
	sortField = "_id";
	collationOptions: CollationOptions | null = null;
}
