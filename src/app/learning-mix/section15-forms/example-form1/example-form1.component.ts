import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Section15ShareService } from '../section15-share.service';
import { UserFormModel } from '../user.form.model';

@Component({
  selector: 'app-example-form1',
  templateUrl: './example-form1.component.html',
  styleUrls: ['./example-form1.component.css'],
})
export class ExampleForm1Component {
  readonly formTitle: string = 'Example of NgForm formlar';

  constructor(private section15SharedService: Section15ShareService) {}

  onSubmitUserForm(userForm: NgForm): void {
    const form = userForm.value;
    const userFormModel: UserFormModel = {
      username: form.username,
      email: form.email,
      question: form.secret,
    };
    this.section15SharedService.sendUserFormToView(userFormModel);
    
  }

  suggestUserName(): void {
    const name = 'SuperUser';
  }
}
