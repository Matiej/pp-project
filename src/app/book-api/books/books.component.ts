import { Component } from '@angular/core';
import { BooksService } from './service/books.service';
import { Book } from './model/book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  constructor(private booksService: BooksService) {

  }

  getBooks(): Book[] {
    return this.booksService.fetchBooks();
  }
  
}
