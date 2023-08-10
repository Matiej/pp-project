import { Injectable } from '@angular/core';
import { OpenlibraryApiService } from '../../openlibrary-api/service/openlibrary-api.service';
import { SearchAuthor } from '../../openlibrary-api/model/search-author.model';
import { Book } from '../model/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private openLibraryService: OpenlibraryApiService) {
  }

  fetchBooks(): Book[] {
    const searchResult: SearchAuthor[] = this.openLibraryService.searchBooksByAuthor()
    const books = []
    for(const element of searchResult) {
      books.push(Book.convertToBook(element));
    }
    return books;
  }

  

}
