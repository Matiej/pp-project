import { Injectable } from '@angular/core';
import { AUTHOR_SEARCH_RESULT } from '../database/books-database';
import { SearchAuthor } from '../model/search-author.model';

@Injectable({
  providedIn: 'root',
})
export class BooksListService {
  constructor() {}

  searchByAuthor(): SearchAuthor[] {
    return AUTHOR_SEARCH_RESULT;
  }
}
