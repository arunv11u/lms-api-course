import { SortTypes } from "@arunvaradharajalu/common.mongodb-paginator";
import { ExploreAllCoursesRequestDTO } from "./explore-all-courses.request.dto.type";


class ExploreAllCoursesRequestDTOImpl implements ExploreAllCoursesRequestDTO {
	categories: string[] = [];
	pageIndex: number = 0;
	pageSize: number = 0;
	searchString: string | null = null;
	sortField: string = "_id";
	sortType: SortTypes = SortTypes.ASC;
}

export {
	ExploreAllCoursesRequestDTOImpl
};