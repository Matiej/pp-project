import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthModule } from './auth/auth.module';
import { BookApiModule } from './book-api/book-api.module';
import { CourseCertComponent } from './course-cert/course-cert.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginInterceptorService } from './interceptors/login--interceptor.service';
import { LearningMixModule } from './learning-mix/learning-mix.module';
import { counterReducer } from './learning-mix/store/counter.reducer';
import { NamedOutletTestComponent } from './named-outlet-test/named-outlet-test.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CourseCertComponent,
    NamedOutletTestComponent,
    ErrorPageComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    LearningMixModule,
    HttpClientModule,
    SharedModule,
    BookApiModule,
    AuthModule,
    StoreModule.forRoot({
      counterKey: counterReducer,
      //auth: authReducer - foex example. you can add another recures here
    }),
    // UserModule, -------- don't need it becasue of lazy loading
    // WishModule, -------- don't need it becasue of lazy loading
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
