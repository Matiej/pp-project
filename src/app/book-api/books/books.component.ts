import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, map } from 'rxjs';
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
  enableButtonName: string = 'Enable';
  $detailsToSend: Observable<BookDetailResponse> =
    new Observable<BookDetailResponse>();
  isSpinner: boolean = false;

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
    this.closeDetails();
    this.isSpinner = true;
    this.$books
      .pipe(
        map((books) => {
          if (books.length > 0) {
            this.isBooksAvailable = true;
            this.isSpinner = false;
          } else {
            this.isBooksAvailable = false;
            this.isSpinner = true;
          }
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

  showDetails(): void {
    console.log('Show Details');
    if (!this.isBookDetails) {
      this.isBookDetails = !this.isBookDetails;
    }
  }

  closeDetails(): void {
    console.log('closeDetails');
    if (this.isBookDetails == true) {
      this.isBookDetails = false;
    }
  }

  sendToBooDetailsComponent(book: Book): void {
    let detailsResponse: Observable<BookDetailResponse> | undefined =
      this.bookService.searchBookDetailsByCode(book);

    this.$detailsToSend = detailsResponse;
  }

  onEnableDefaultBooks() {
    this.isBooksAvailable = !this.isBooksAvailable;
    this.enableButtonName = !this.isBooksAvailable ? 'Enable' : 'Disable';
  }
}
