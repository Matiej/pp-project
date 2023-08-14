import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { OpenLibrarySearch } from '../../openlibrary-api/model/openLibrary.search';
import { SearchBook } from '../../openlibrary-api/model/search-book.model';
import { OpenlibraryApiService } from '../../openlibrary-api/service/openlibrary-api.service';
import { Book } from '../model/book.model';
import { BookDetails } from '../model/book.details.model';
import { BookDetailResponse } from '../book-detail/book-detail-response';
import { OpenLibraryBook } from '../../openlibrary-api/model/opeLibrary.book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private searchBooksByTitleSubject = new BehaviorSubject<Book[] | null>(null);
  searchQuery$ = this.searchBooksByTitleSubject.asObservable();

  constructor(private openLibraryService: OpenlibraryApiService) {}

  setSearchBooksByTitle(booksSearchByTitle: string) {
    this.searchBooksByTitle(booksSearchByTitle).subscribe((books) => {
      this.searchBooksByTitleSubject.next(books);
    });
  }

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

  // searchBookDetailsByCode(
  //   code: string,
  //   book: Book
  // ): Observable<BookDetailResponse> | null {
  //   this.openLibraryService.seachBookByIdCode(code).pipe(
  //     map((openLibraryBook: OpenLibraryBook) => {
  //       const bookDetails = new BookDetails();
  //       bookDetails.subjects(openLibraryBook.subjects);
  //       bookDetails.description(openLibraryBook.description);
  //       const response = new BookDetailResponse();

  //       return response;
  //     })
  //   );
  //   return null;
  // }
}
