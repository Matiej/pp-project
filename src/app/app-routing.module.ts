import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningMixComponent } from './learning-mix/learning-mix.component';

const routes: Routes = [
  {
    path: 'learning-mix',
    component: LearningMixComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
