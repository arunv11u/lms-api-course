import { SortTypes } from "@arunvaradharajalu/common.mongodb-paginator";


class CoursePaginationValueObject {
	pageIndex: number;
	pageSize: number;
	sortType: SortTypes;
	sortField: string;
}

export { CoursePaginationValueObject };