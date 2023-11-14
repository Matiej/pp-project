import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthorsComponent } from './book-api/authors/authors.component';
import { BookApiComponent } from './book-api/book-api.component';
import { BookDetailComponent } from './book-api/books/book-detail/book-detail.component';
import { BookItemComponent } from './book-api/books/book-list/book-item/book-item.component';
import { BookListComponent } from './book-api/books/book-list/book-list.component';
import { BooksSerchBarComponent } from './book-api/books/books-serch-bar/books-serch-bar.component';
import { BooksComponent } from './book-api/books/books.component';
import { CourseCertComponent } from './course-cert/course-cert.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LearningMixComponent } from './learning-mix/learning-mix.component';
import { LearningMixModule } from './learning-mix/learning-mix.module';
import { NamedOutletTestComponent } from './named-outlet-test/named-outlet-test.component';
import { SharedModule } from './shared/shared.module';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserItemComponent } from './user/user-list/user-item/user-item.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserComponent } from './user/user.component';
import { WishDetailsComponent } from './wish/wish-details/wish-details.component';
import { WishEditComponent } from './wish/wish-edit/wish-edit.component';
import { WishItemComponent } from './wish/wish-list/wish-item/wish-item.component';
import { WishListComponent } from './wish/wish-list/wish-list.component';
import { WishStartComponent } from './wish/wish-start/wish-start.component';
import { WishComponent } from './wish/wish.component';

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
    UserComponent,
    UserItemComponent,
    UserListComponent,
    UserDetailsComponent,
    UserEditComponent,
    NamedOutletTestComponent,
    LoginComponent,
    LogoutComponent,
    ErrorPageComponent,
    WishStartComponent,
    UserRegisterComponent,

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
  exports: [],
})
export class AppModule {}
