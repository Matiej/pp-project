import { Injectable } from '@angular/core';
import { OpenlibraryApiService } from '../../openlibrary-api/service/openlibrary-api.service';
import { SearchBook } from '../../openlibrary-api/model/search-book.model';
import { Book } from '../model/book.model';
import { HttpClient } from '@angular/common/http';
import { OpenLibrarySearch } from '../../openlibrary-api/model/openLibrary.search';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private openLibraryService: OpenlibraryApiService) {}

  fetchBooks(): Book[] {
    const searchResult: SearchBook[] =
      this.openLibraryService.searchBooksByAuthor();
    const books = [];
    for (const element of searchResult) {
      books.push(Book.convertToBook(element));
    }
    return books;
  }

  searchBooksByTitle(title: string): Observable<Book[]> {
    return this.openLibraryService.searchBooksByTitle(title).pipe(
      map((openLibrarySearch: OpenLibrarySearch) => {
        if (openLibrarySearch && openLibrarySearch.numFound > 0) {
          return Book.convertToBookList(openLibrarySearch.docs);
        }
        return [];
      })
    );
  }
}
