import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Book } from '../model/book.model';
import { BooksService } from '../service/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, OnChanges {
  books: Book[] = [];
  @Input()
  titleSearchQuery: string = '';

  constructor(private booksService: BooksService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['titleSearchQuery'] &&
      changes['titleSearchQuery'].currentValue
    ) {
      this.searchForBooksByTitle(this.titleSearchQuery);
    }
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  private loadBooks(): void {
    this.books.push(...this.booksService.fetchBooks());
  }

  private searchForBooksByTitle(title: string): void {
    this.booksService.searchBooksByTitle(title).subscribe(
      (books: Book[]) => {
        if (books.length > 0) {
          this.books.push(...books);
        }
      },
      (error: any) => {
        console.log('An error occurred: ' + error);
      }
    );
  }
}
