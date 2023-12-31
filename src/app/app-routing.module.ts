import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CourseCertComponent } from './course-cert/course-cert.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { LearningMixComponent } from './learning-mix/learning-mix.component';
import { NamedOutletTestComponent } from './named-outlet-test/named-outlet-test.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'course-cert',
    pathMatch: 'full',
  },
  {
    path: 'wishes',
    loadChildren: () => import('./wish/wish.module').then((m) => m.WishModule),
    // it is old version of anuglar syntax
    // loadChildren: './wish/wish.module.ts#WishModule',
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((l) => l.UserModule),
  },

  {
    path: 'learning-mix',
    component: LearningMixComponent,
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
    // this doesnt work for me. Keep it in mind to fix it later when find out how
    path: 'outelttest',
    component: NamedOutletTestComponent,
    outlet: 'outlet1',
  },
  // this one must be alwasys the last one because always redirects to notfound#
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not found!' },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
