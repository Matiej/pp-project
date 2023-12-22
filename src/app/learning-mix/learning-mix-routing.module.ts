import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningMixComponent } from './learning-mix.component';
import { Option1Section11Component } from './section11-routing/option1-section11/option1-section11.component';
import { Option2Section11Component } from './section11-routing/option2-section11/option2-section11.component';

const routes: Routes = [
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningMixRoutingModule { }
