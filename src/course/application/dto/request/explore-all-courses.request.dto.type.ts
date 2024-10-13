import { SortTypes } from "@arunvaradharajalu/common.mongodb-paginator";


interface ExploreAllCoursesRequestDTO {
	searchString: string | null;
	categories: string[];
	pageIndex: number;
	pageSize: number;
	sortType: SortTypes;
	sortField: string;
}

export {
	ExploreAllCoursesRequestDTO
};