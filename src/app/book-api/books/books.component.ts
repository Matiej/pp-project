import { Component, Input } from '@angular/core';
import { BooksService } from './service/books.service';
import { Book } from './model/book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  titleSearchQuery: string = '';
  clickResult: string = '';

  constructor() {}

  onTitleSearchSubmit() {
    this.clickResult = this.titleSearchQuery;
    this.titleSearchQuery = "";
  }


}
