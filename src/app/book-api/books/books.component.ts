import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { Book } from './model/book.model';
import { BooksService } from './service/books.service';
import { BookDetailResponse } from './book-detail/book-detail-response';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  $books: Observable<Book[]> = new Observable<Book[]>();
  isBooksAvailable: boolean = false;
  isBookDetails: boolean = false;
  $detailsToSend: Observable<BookDetailResponse> =
    new Observable<BookDetailResponse>();
  isSpinner: boolean = false;
  isDeafultBooksEneabled: boolean = false;

  constructor(private bookService: BooksService) {}

  onSearchSubmit(searchRequest: {
    criteria: string;
    text: string;
    sorting: string;
    limit: number;
  }) {
    switch (searchRequest.criteria) {
      case 'title':
        this.$books = this.searchBooksByTitle(searchRequest.text);
        break;
      case 'author':
        this.$books = this.searchBooksByAuthor(
          searchRequest.text,
          searchRequest.sorting
        );
        break;
      case 'text':
        this.$books = this.searchBooksByText(
          searchRequest.text,
          searchRequest.limit
        );
        break;
      case 'subject':
        alert('subject serach is not available');
        break;
      default:
        alert('nothing to display');
    }
    this.featchBooksActions(this.$books);
  }

  onEnableDefaultBooks() {
    if (this.isBooksAvailable && this.isDeafultBooksEneabled) {
      this.$books = of([]);
      this.closeDetails();
    } else {
      this.$books = this.fetchDefaultBooks();
      this.isDeafultBooksEneabled = true;
    }
    this.featchBooksActions(this.$books);
  }

  private featchBooksActions(booksObs: Observable<Book[]>): void {
    this.isBooksAvailable = false;
    this.isSpinner = true;
    this.closeDetails();
    booksObs
      .pipe(
        map((books) => {
          if (books.length > 0) {
            this.isBooksAvailable = true;
          } else {
            this.isBooksAvailable = false;
            this.isSpinner = false;
          }
          this.isSpinner = false;
        })
      )
      .subscribe();
  }

  private searchBooksByTitle(title: string): Observable<Book[]> {
    return this.bookService.searchBooksByTitle(title);
  }

  private searchBooksByAuthor(
    author: string,
    sorting: string
  ): Observable<Book[]> {
    return this.bookService.searchBooksByAuthor(author, sorting);
  }

  private searchBooksByText(text: string, limit: number): Observable<Book[]> {
    return this.bookService.searchBooksByText(text, limit);
  }

  private fetchDefaultBooks(): Observable<Book[]> {
    return this.bookService.fetchBooks();
  }

  showDetails(): void {
    if (!this.isBookDetails) {
      this.isBookDetails = !this.isBookDetails;
    }
  }

  closeDetails(): void {
    if (this.isBookDetails == true) {
      this.isBookDetails = false;
      this.$detailsToSend = of();
    }
  }

  sendToBooDetailsComponent(book: Book): void {
    let detailsResponse: Observable<BookDetailResponse> | undefined =
      this.bookService.searchBookDetailsByCode(book);

    this.$detailsToSend = detailsResponse;
  }

  get enableButtonName(): string {
    return !this.isBooksAvailable ? 'Enable' : 'Disable';
  }
}
