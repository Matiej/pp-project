import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { CanDeactivateGuardService } from '../auth/can-deactivate-guard.service';
import { WishDetailsComponent } from './wish-details/wish-details.component';
import { WishEditComponent } from './wish-edit/wish-edit.component';
import { WishStartComponent } from './wish-start/wish-start.component';
import { WishComponent } from './wish.component';

const routes: Routes = [
  {
    path: '',
    component: WishComponent,
    canActivate: [AuthGuard],
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WishRoutingModule {}
