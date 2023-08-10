import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book.model';
import { BooksService } from '../service/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  private loadBooks(): void {
    this.books = this.booksService.fetchBooks();
  }
}
