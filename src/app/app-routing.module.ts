import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './book-api/authors/authors.component';
import { BookApiComponent } from './book-api/book-api.component';
import { CourseCertComponent } from './course-cert/course-cert.component';
import { HomeComponent } from './home/home.component';
import { LearningMixComponent } from './learning-mix/learning-mix.component';
import { Option1Section11Component } from './learning-mix/section11-routing/option1-section11/option1-section11.component';
import { Option2Section11Component } from './learning-mix/section11-routing/option2-section11/option2-section11.component';
import { UserComponent } from './user/user.component';
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

  {
    path: 'user',
    component: UserComponent,
  },

  {
    path: 'learning-mix',
    component: LearningMixComponent,
    children: [
      {
        path: 'options1',
        component: Option1Section11Component,
      },
    ],
  },
  {
    path: 'learning-mix',
    component: LearningMixComponent,
    children: [
      {
        path: 'sec11/options2',
        component: Option2Section11Component,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
