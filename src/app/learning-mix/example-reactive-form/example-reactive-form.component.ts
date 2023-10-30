import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-example-reactive-form',
  templateUrl: './example-reactive-form.component.html',
  styleUrls: ['./example-reactive-form.component.css'],
})
export class ExampleReactiveFormComponent implements OnInit {
  genders: string[] = [];
  userForm!: FormGroup;

  constructor() {
    this.genders = ['male', 'female', 'unknown'];
  }
  ngOnInit(): void {
     this.userForm = new FormGroup({
      'usrername': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'genderInput': new FormControl('unknown', Validators.required)
     });
  }

}
