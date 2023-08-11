import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningMixComponent } from './learning-mix/learning-mix.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { BooksComponent } from './book-api/books/books.component';
import { BookApiComponent } from './book-api/book-api.component';

const routes: Routes = [
  {
    path: 'learning-mix',
    component: LearningMixComponent,
  },
  {
    path: 'whish-list',
    component: WishListComponent
  },
  {
    path: 'books',
    component: BookApiComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
