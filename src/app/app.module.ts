import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book-api/book.module';
import { CourseCertComponent } from './course-cert/course-cert.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginInterceptorService } from './interceptors/login--interceptor.service';
import { LearningMixComponent } from './learning-mix/learning-mix.component';
import { LearningMixModule } from './learning-mix/learning-mix.module';
import { NamedOutletTestComponent } from './named-outlet-test/named-outlet-test.component';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { WishModule } from './wish/wish.module';

@NgModule({
  declarations: [
    AppComponent,
    LearningMixComponent,
    HeaderComponent,
    HomeComponent,
    CourseCertComponent,
    NamedOutletTestComponent,
  
    ErrorPageComponent,
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
    WishModule,
    UserModule,
    BookModule,
    AuthModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
