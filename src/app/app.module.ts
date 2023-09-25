import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookApiComponent } from './book-api/book-api.component';
import { BookDetailComponent } from './book-api/books/book-detail/book-detail.component';
import { BookItemComponent } from './book-api/books/book-list/book-item/book-item.component';
import { BookListComponent } from './book-api/books/book-list/book-list.component';
import { BooksSerchBarComponent } from './book-api/books/books-serch-bar/books-serch-bar.component';
import { BooksComponent } from './book-api/books/books.component';
import { CourseCertComponent } from './course-cert/course-cert.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LearningMixComponent } from './learning-mix/learning-mix.component';
import { LearningMixModule } from './learning-mix/learning-mix.module';
import { SharedModule } from './shared/shared.module';
import { WishEditComponent } from './wish/wish-edit/wish-edit.component';
import { WishItemComponent } from './wish/wish-list/wish-item/wish-item.component';
import { WishListComponent } from './wish/wish-list/wish-list.component';
import { WishComponent } from './wish/wish.component';
import { WishDetailsComponent } from './wish/wish-details/wish-details.component';
import { AuthorsComponent } from './book-api/authors/authors.component';

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
    WishEditComponent,
    BookItemComponent,
    HomeComponent,
    BooksSerchBarComponent,
    CourseCertComponent,
    WishComponent,
    WishDetailsComponent,
    AuthorsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LearningMixModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxExtendedPdfViewerModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
