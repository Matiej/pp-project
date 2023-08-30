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

  constructor(private bookService: BooksService) {}

  onTitleSearchSubmit(searchRequest: { criteria: string; text: string }) {
    switch (searchRequest.criteria) {
      case 'title':
        this.$books = this.searchBooksByTitle(searchRequest.text);
        break;
      case 'author':
        alert('author serach is not available');
        break;
      case 'text':
        alert('text serach is not available');
        break;
      case 'subject':
        alert('subject serach is not available');
        break;
      default:
        alert('nothing to display');
    }
    this.$books
      .pipe(
        map((books) => {
          if (books.length > 0) {
            this.isBooksAvailable = true;
          } else {
            this.isBooksAvailable = false;
          }
        })
      )
      .subscribe();
  }

  private searchBooksByTitle(title: string): Observable<Book[]> {
    return this.bookService.searchBooksByTitle(title);
  }

  showDetails(): void {
    this.isBookDetails = !this.isBookDetails;
  }

  closeDetails(): void {
    this.isBookDetails = false;
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
