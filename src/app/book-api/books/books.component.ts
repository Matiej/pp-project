import { Component, Input } from '@angular/core';
import { BooksService } from './service/books.service';
import { Book } from './model/book.model';
import { NgForm } from '@angular/forms';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  $books: Observable<Book[]> = new Observable<Book[]>();
  isEmptyBooks: boolean = false;

  constructor(private bookService: BooksService) {}

  onTitleSearchSubmit(searchBookBytitleForm: NgForm) {
 
    this.$books = this.bookService.searchBooksByTitle(
      searchBookBytitleForm.value.byTitle
    );
 
    this.$books.pipe(
      map((books) => {
        if (books.length > 0) {
          this.isEmptyBooks = true;
        } else {
          this.isEmptyBooks = false;
        }
      })
    ).subscribe();
    // this.bookService.setSearchBooksByTitle(searchBookBytitleForm.value.byTitle);
    searchBookBytitleForm.reset();
  }
}
