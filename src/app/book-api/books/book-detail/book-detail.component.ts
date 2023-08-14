import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../model/book.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  
  @Output()
  closeDetails: EventEmitter<void> = new EventEmitter();

  @Input()
  incomingBook: Book | undefined;

  ngOnInit(): void {
   
  }

  onCloseClick(): void {
    this.closeDetails.emit();
  }
}
