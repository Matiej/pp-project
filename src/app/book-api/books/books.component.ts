import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Book } from './model/book.model';
import { BooksService } from './service/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  $books: Observable<Book[]> = new Observable<Book[]>();
  isEmptyBooks: boolean = true;
  isBookDetails: boolean = false;
  bookToSend: Book | undefined;
  

  constructor(private bookService: BooksService) {}

  onTitleSearchSubmit(searchBookBytitleForm: NgForm) {
    this.$books = this.bookService.searchBooksByTitle(
      searchBookBytitleForm.value.byTitle
    );

    this.$books
      .pipe(
        map((books) => {
          if (books.length > 0) {
            this.isEmptyBooks = true;
          } else {
            this.isEmptyBooks = false;
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

  sendToBooDetailsComponent(book: Book):void {
    this.bookService
    this.bookToSend = book;
  }
}
