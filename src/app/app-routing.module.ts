import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningMixComponent } from './learning-mix/learning-mix.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { BookApiComponent } from './book-api/book-api.component';
import { HomeComponent } from './home/home.component';
import { CourseCertComponent } from './course-cert/course-cert.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'learning-mix',
    component: LearningMixComponent,
  },
  {
    path: 'whish-list',
    component: WishListComponent,
  },
  {
    path: 'books',
    component: BookApiComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'course-cert',
    component: CourseCertComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
