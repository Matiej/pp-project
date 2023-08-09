import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LearningMixComponent } from './learning-mix/learning-mix.component';
import { LearningMixModule } from './learning-mix/learning-mix.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BookApiComponent } from './book-api/book-api.component';
import { HeaderComponent } from './header/header.component';
import { BooksComponent } from './book-api/books/books.component';
import { BookListComponent } from './book-api/books/book-list/book-list.component';
import { BookDetailComponent } from './book-api/books/book-detail/book-detail.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { WishItemComponent } from './wish-list/wish-item/wish-item.component';
import { WishEditComponent } from './wish-list/wish-edit/wish-edit.component';
 
@NgModule({
  declarations: [
    AppComponent,
    LearningMixComponent,
    BookApiComponent,
    HeaderComponent,
    BooksComponent,
    BookListComponent,
    BookDetailComponent,
    WishListComponent,
    WishItemComponent,
    WishEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LearningMixModule,
    FormsModule,
    ReactiveFormsModule
  ],
 
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
