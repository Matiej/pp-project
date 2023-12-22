import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { CanDeactivateGuardService } from '../auth/can-deactivate-guard.service';
import { userResolver } from './service/user.resolver';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: 'register',
    component: UserRegisterComponent,
    canDeactivate: [CanDeactivateGuardService],
  },
  {
    path: '',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
