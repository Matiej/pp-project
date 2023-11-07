import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { CanDeactivateGuardService } from './auth/can-deactivate-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthorsComponent } from './book-api/authors/authors.component';
import { BookApiComponent } from './book-api/book-api.component';
import { CourseCertComponent } from './course-cert/course-cert.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { LearningMixComponent } from './learning-mix/learning-mix.component';
import { Option1Section11Component } from './learning-mix/section11-routing/option1-section11/option1-section11.component';
import { Option2Section11Component } from './learning-mix/section11-routing/option2-section11/option2-section11.component';
import { NamedOutletTestComponent } from './named-outlet-test/named-outlet-test.component';
import { userResolver } from './user/service/user.resolver';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserComponent } from './user/user.component';
import { WishDetailsComponent } from './wish/wish-details/wish-details.component';
import { WishEditComponent } from './wish/wish-edit/wish-edit.component';
import { WishStartComponent } from './wish/wish-start/wish-start.component';
import { WishComponent } from './wish/wish.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'course-cert',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'learning-mix',
    component: LearningMixComponent,
  },

  {
    path: 'wish',
    component: WishComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: WishStartComponent,
      },

      {
        path: 'new',
        component: WishEditComponent,
        canDeactivate: [CanDeactivateGuardService],
      },
      {
        path: ':id/edit',
        component: WishEditComponent,
        canDeactivate: [CanDeactivateGuardService],
      },
      {
        path: ':id',
        pathMatch: 'full',
        component: WishDetailsComponent,
      },
    ],
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
    path: 'user/register',
    component: UserRegisterComponent,
    canDeactivate: [CanDeactivateGuardService],
  },

  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'new',
        component: UserEditComponent,
        canDeactivate: [CanDeactivateGuardService],
      },

      {
        path: ':id',
        component: UserDetailsComponent,
        resolve: { user: userResolver },
      },
      {
        path: ':id/edit',
        component: UserEditComponent,
        canDeactivate: [CanDeactivateGuardService],
      },
    ],
  },

  {
    // this doesnt work for me. Keep it in mind to fix it later when find out how
    path: 'outelttest',
    component: NamedOutletTestComponent,
    outlet: 'outlet1',
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

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },

  // this one must be alwasys the last one because always redirects to notfound#
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not found!' },
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
