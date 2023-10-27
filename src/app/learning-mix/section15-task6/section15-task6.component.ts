import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ASSETS_PATHS } from 'src/app/constants/assets-paths';

@Component({
  selector: 'app-section15-task6',
  templateUrl: './section15-task6.component.html',
  styleUrls: ['./section15-task6.component.css'],
})
export class Section15Task6Component {
  readonly formTitle: String = 'Section 15 Task-6';
  readonly defaultSubscription: string = 'advanced';
  readonly submitedViewTitle: string = 'Submitted form';
  readonly userImagePath: string = ASSETS_PATHS.USER_IMAGE_ICON;
  @ViewChild('subscriptionForm')
  subscriptionForm!: NgForm;
  isSubmitted: boolean = false;
  emailAddress: string = '';
  password: string = '';
  subscription: string = '';

  onSubmitUserForm() {
    if (this.subscriptionForm && this.subscriptionForm.valid) {
      this.isSubmitted = true;
      const form = this.subscriptionForm.value;
      console.log(form);
      this.emailAddress = form.userRegister.email;
      this.password = form.userRegister.pass;
      this.subscription = form.userRegister.subscription;
      this.subscriptionForm.reset();
    }
  }
}
