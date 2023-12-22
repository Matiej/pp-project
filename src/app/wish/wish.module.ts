import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { WishDetailsComponent } from './wish-details/wish-details.component';
import { WishEditComponent } from './wish-edit/wish-edit.component';
import { WishItemComponent } from './wish-list/wish-item/wish-item.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { WishRoutingModule } from './wish-routing.module';
import { WishStartComponent } from './wish-start/wish-start.component';
import { WishComponent } from './wish.component';

@NgModule({
  declarations: [
    WishListComponent,
    WishItemComponent,
    WishEditComponent,
    WishComponent,
    WishDetailsComponent,
    WishStartComponent,
  ],
  imports: [
    WishRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class WishModule {}
