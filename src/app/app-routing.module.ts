import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './book-api/authors/authors.component';
import { BookApiComponent } from './book-api/book-api.component';
import { CourseCertComponent } from './course-cert/course-cert.component';
import { HomeComponent } from './home/home.component';
import { LearningMixComponent } from './learning-mix/learning-mix.component';
import { WishComponent } from './wish/wish.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'learning-mix',
    component: LearningMixComponent,
  },
  {
    path: 'whish',
    component: WishComponent,
  },
  {
    path: 'books',
    component: BookApiComponent,
  },
  {
    path: 'authors',
    component: AuthorsComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'course-cert',
    component: CourseCertComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
