import { Injectable } from '@angular/core';
import { SearchBook } from '../model/search-book.model';
import { AUTHOR_SEARCH_RESULT } from '../books-database';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { OpenLibrarySearch } from '../model/openLibrary.search';

@Injectable({
  providedIn: 'root',
})
export class OpenlibraryApiService {
  readonly OPELIBRARY_SEARCH_URL: string =
    'https://openlibrary.org/search.json';

  constructor(private http: HttpClient) {}

  searchBooksByAuthor(): SearchBook[] {
    return AUTHOR_SEARCH_RESULT;
  }

  searchBooksByTitle(title: string): Observable<OpenLibrarySearch> {
    let params = new HttpParams().append(
      'title',
      this.prepareSearchParam(title)
    );
    const searchResult: Observable<OpenLibrarySearch> =
      this.http.get<OpenLibrarySearch>(this.OPELIBRARY_SEARCH_URL, {
        params: params,
      });

    return searchResult;
  }

  private prepareSearchParam(searchParamm: string): string {
    return searchParamm.replaceAll(' ', '+');
  }
}
