import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { BookApiComponent } from './book-api.component';

const routes: Routes = [
  {
    path: 'books',
    component: BookApiComponent,
  },
  {
    path: 'authors',
    component: AuthorsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookApiRoutingModule { }
