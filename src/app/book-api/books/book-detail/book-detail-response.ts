import { BookDetails } from '../model/book.details.model';
import { Book } from '../model/book.model';

export class BookDetailResponse {
  private _book: Book;
  private _bookDetails: BookDetails;

  constructor(book: Book, bookDetails: BookDetails) {
    this._book = book;
    this._bookDetails = bookDetails;
  }

  get book(): Book {
    return this._book;
  }

  get bookDetails(): BookDetails {
    return this._bookDetails;
  }
}
