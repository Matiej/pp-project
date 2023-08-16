import { Component } from '@angular/core';
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
  //todo change this to false;
  isBooksAvailable: boolean = true;
  isBookDetails: boolean = false;
  $detailsToSend: Observable<BookDetailResponse> =
    new Observable<BookDetailResponse>();

  constructor(private bookService: BooksService) {}

  onTitleSearchSubmit(searchBookBytitleForm: NgForm) {
    this.$books = this.bookService.searchBooksByTitle(
      searchBookBytitleForm.value.byTitle
    );

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
    searchBookBytitleForm.reset();
  }

  showDetails(): void {
    this.isBookDetails = true;
  }

  closeDetails(): void {
    this.isBookDetails = false;
  }

  sendToBooDetailsComponent(book: Book): void {
    console.log(book);
    let detailsResponse: Observable<BookDetailResponse> | undefined =
      this.bookService.searchBookDetailsByCode(book);

    this.$detailsToSend = detailsResponse;
  }
}
