import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { AuthorsComponent } from './authors/authors.component';
import { BookApiComponent } from './book-api.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookItemComponent } from './books/book-list/book-item/book-item.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BooksSerchBarComponent } from './books/books-serch-bar/books-serch-bar.component';
import { BooksComponent } from './books/books.component';

@NgModule({
  declarations: [
    BookApiComponent,
    BooksComponent,
    BookListComponent,
    BookDetailComponent,
    BookItemComponent,
    BooksSerchBarComponent,
    AuthorsComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, AppRoutingModule],
  exports: [
    BookApiComponent,
    BooksComponent,
    BookListComponent,
    BookDetailComponent,
    BookItemComponent,
    BooksSerchBarComponent,  AuthorsComponent,
  ],
})
export class BookModule {}
