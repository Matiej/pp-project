import { Injectable } from '@angular/core';
import { SearchAuthor } from '../model/search-author.model';
import { AUTHOR_SEARCH_RESULT } from '../books-database';

@Injectable({
  providedIn: 'root'
})
export class OpenlibraryApiService {

  constructor() { }

  searchBooksByAuthor(): SearchAuthor[] {
    return AUTHOR_SEARCH_RESULT;
  }
}
