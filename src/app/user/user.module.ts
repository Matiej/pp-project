import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserItemComponent } from './user-list/user-item/user-item.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [
    UserComponent,
    UserItemComponent,
    UserListComponent,
    UserDetailsComponent,
    UserEditComponent,
    UserRegisterComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, UserRoutingModule],
  exports: [
    UserComponent,
    UserItemComponent,
    UserListComponent,
    UserDetailsComponent,
    UserEditComponent,
    UserRegisterComponent,
  ],
})
export class UserModule {}
