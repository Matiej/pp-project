import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Book } from '../model/book.model';
import { BooksService } from '../service/books.service';
import { Observable } from 'rxjs';
import { BookDetailResponse } from '../book-detail/book-detail-response';
import { WishSharedService } from 'src/app/shared/wish-shared.service';
import { TOAST_MESSAGES } from 'src/app/constants/toast-messages';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  encapsulation: ViewEncapsulation.Emulated, // it is default setting, if change for nonte,
  // all css styles from this componen will be available and overwritte others
})
export class BookListComponent implements OnInit, OnChanges {
  @Input()
  $booksChild: Observable<Book[]> = new Observable<Book[]>();
  books: Book[] = [];
  @Output()
  book: EventEmitter<Book> = new EventEmitter();
  @Output()
  enableBookDetails: EventEmitter<void> = new EventEmitter();
  showToast: boolean = false;
  toastMessage: string = "";

  constructor(
    private booksService: BooksService,
    private wishSharedService: WishSharedService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
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
        console.error('An error occurred while fetching books: ' + error);
      }
    );
  }

  private loadBooks(): void {
    this.books.push(...this.booksService.fetchBooks());
  }

  onDetailsClick(book: Book): void {
    this.enableBookDetails.emit();
    this.book.emit(book);
  }

  onToWishListClick(book: Book): void {
    const response: Observable<BookDetailResponse> =
      this.booksService.searchBookDetailsByCode(book);
    this.wishSharedService.addToWishList(response)
    this.showToastMessage(TOAST_MESSAGES.WISH_ADDED_SUCCESSFULLY, 3000);
  }

  private showToastMessage(message: string, timeout: number) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, timeout);
  }
}
