import { DocsCountList } from "../types";

export class DocsCountListImpl<T> implements DocsCountList<T> {
	docs: T[] = [];
	count: number;
}
