import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../model/book.model';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent {
  @Input({
    required: true,
  })
  book: Book = new Book;
  @Input({
    required: true,
  })
  bookNumber: number = 0;
  @Output()
  isBookDetails: EventEmitter<void> = new EventEmitter();


  onClickItem(): void {
    this.isBookDetails.emit();
  }
}
