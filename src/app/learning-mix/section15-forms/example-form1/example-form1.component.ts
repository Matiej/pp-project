import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Section15ShareService } from '../section15-share.service';

@Component({
  selector: 'app-example-form1',
  templateUrl: './example-form1.component.html',
  styleUrls: ['./example-form1.component.css'],
})
export class ExampleForm1Component {
  readonly formTitle: string = 'Example of NgForm formlar';
  username: string = '';

  constructor(private section15SharedService: Section15ShareService) {}

  onSubmitUserForm(userForm: NgForm): void {
    this.section15SharedService.sendUserFormToView(userForm);
  }

  suggestUserName(): void {
    const name = 'SuperUser';
    this.username = name;
  }
}
