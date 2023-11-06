import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-example-reactive-form',
  templateUrl: './example-reactive-form.component.html',
  styleUrls: ['./example-reactive-form.component.css'],
})
export class ExampleReactiveFormComponent implements OnInit {
  readonly reactiveFormExampleTitle: string = 'Example Reactive Form';
  genders: string[] = [];
  userForm!: FormGroup;
  readonly forbiddenNames: string[] = ['Maciek', 'Jaro'];

  constructor() {
    this.genders = ['male', 'female', 'unknown'];
  }
  ngOnInit(): void {
    this.userForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNamesValidator.bind(this),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),

      genderInput: new FormControl('unknown', Validators.required),
      hobbiesArray: new FormArray([], Validators.required),
    });
  }

  onSubmit() {
    console.log(this.userForm);
  }

  onAddHobby() {
    const control = new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]);
    (<FormArray>this.userForm.get('hobbiesArray')).push(control);
  }

  public getHobbiesControls() {
    return (this.userForm.get('hobbiesArray') as FormArray).controls;
  }

  forbiddenNamesValidator(control: FormControl): {
    [s: string]: boolean;
  } | null {
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }
}
