import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-example-reactive-form',
  templateUrl: './example-reactive-form.component.html',
  styleUrls: ['./example-reactive-form.component.css'],
})
export class ExampleReactiveFormComponent {
  genders: string[] = [];
  userForm!: FormGroup;

  constructor() {
    this.genders = ['male', 'female', 'unknown'];
  }

}
