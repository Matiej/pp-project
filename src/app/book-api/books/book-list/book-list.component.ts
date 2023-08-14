import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Book } from '../model/book.model';
import { BooksService } from '../service/books.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, OnChanges {
  @Input()
  $booksChild: Observable<Book[]> = new Observable<Book[]>();
  books: Book[] = [];

  @Output()
  book: EventEmitter<Book> = new EventEmitter();

  @Output()
  enableBookDetails: EventEmitter<void> = new EventEmitter();

  constructor(private booksService: BooksService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngchanges');
    console.log(changes['$booksChild'].currentValue);

    if (changes['$booksChild'] && changes['$booksChild'].currentValue) {
      this.books = [];
      this.subscribeNewBooks();
    }
  }

  ngOnInit(): void {
    this.books = [];
    this.subscribeNewBooks();

    this.loadBooks();
  }

  private subscribeNewBooks() {
    this.$booksChild.subscribe(
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

  private loadBooks(): void {

    this.books.push(...this.booksService.fetchBooks());
  }

  onDetailsClick(book: Book):void {
    console.log(book.title)
    this.enableBookDetails.emit();
    this.book.emit(book);
  }

}
