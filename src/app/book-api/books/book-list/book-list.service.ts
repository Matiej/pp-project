// import { Injectable } from '@angular/core';
// import { SearchAuthor } from '../../openlibrary-api/model/search-author.model';
// import { OpenlibraryApiService } from '../../openlibrary-api/service/openlibrary-api.service';
// import { Book } from '../model/book.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class BooksListService {

//   constructor(private openLibraryService: OpenlibraryApiService) {
//   }

//   fetchBooks(): Book[] {
//     const searchResult: SearchAuthor[] = this.openLibraryService.searchBooksByAuthor()
//     const books = []
//     for(const element of searchResult) {
//       books.push(Book.convertToBook(element));
//     }
//     return books;
//   }
// }
