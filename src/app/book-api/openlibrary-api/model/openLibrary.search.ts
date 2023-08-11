import { SearchBook } from "./search-book.model";

export interface OpenLibrarySearch {
    numFound: number;
    start: number;
    numFoundExact: boolean;
    docs: SearchBook[];
    num_found: number;
    offset: string;
}