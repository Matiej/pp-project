import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Section15ShareService } from '../section15-share.service';

@Component({
  selector: 'app-example-form2-validated',
  templateUrl: './example-form2-validated.component.html',
  styleUrls: ['./example-form2-validated.component.css'],
})
export class ExampleForm2ValidatedComponent {
  readonly formTitle: string = 'Example of NgForm formlar with Validation';

  questionAswer: string = '';
  @ViewChild('userForm')
  userFrom!: NgForm;
  readonly genders: string[] = ['male', 'female', 'my secret'];
  readonly defaultSecretQuestion: string = 'pet';

  constructor(private section15Service: Section15ShareService) {}

  suggestUserName() {
    console.log(this.userFrom);
    this.userFrom.form.patchValue({
      userData: {
        username: 'SupeUserName',
      },
    });
    this.userFrom.form.patchValue({
      userSecret: {
        secret: 'pet',
      },
    });
  }

  onSubmitUserForm() {
    if (this.userFrom && this.userFrom.valid) {
      this.section15Service.sendUserFormToView(this.userFrom);
      this.userFrom.reset();
      this.questionAswer = '';
    }
  }
}
