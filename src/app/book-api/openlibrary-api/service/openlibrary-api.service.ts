import { Injectable } from '@angular/core';
import { SearchBook } from '../model/search-book.model';
import { AUTHOR_SEARCH_RESULT } from '../books-database';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { OpenLibrarySearch } from '../model/openLibrary.search';
import { OpenLibraryBook } from '../model/opeLibrary.book.model';

@Injectable({
  providedIn: 'root',
})
export class OpenlibraryApiService {
  private readonly OPELIBRARY_SEARCH_URL: string =
    'https://openlibrary.org/search.json';

  private readonly OPELIBRARY_BOOKS_URL: string =
    'https://openlibrary.org';

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
    console.log(searchResult);
    return searchResult;
  }

  private prepareSearchParam(searchParamm: string): string {
    return searchParamm.replaceAll(' ', '+');
  }

  seachBookByIdCode(code: string | undefined): Observable<OpenLibraryBook> {
    const result: Observable<OpenLibraryBook> = this.http.get<OpenLibraryBook>(
      this.OPELIBRARY_BOOKS_URL + code + '.json'
    );
      console.log(result);
    return result;
  }
}
