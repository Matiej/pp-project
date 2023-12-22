import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [LoginComponent, LogoutComponent],
})
export class AuthModule {}
