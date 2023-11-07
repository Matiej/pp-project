import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit, OnDestroy {
  isSaved: boolean = false;
  readonly registerFormTitle: string = 'Register your account';
  registerForm!: FormGroup;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required]),
        surname: new FormControl(null, [Validators.required]),
        birthyear: new FormControl(null, [
          Validators.required,
          Validators.maxLength(4),
          Validators.pattern(/^\d{4}$/),
        ]),
        address1: new FormControl(null, [Validators.required]),
        address2: new FormControl(null, [Validators.required]),
        genderSelect: new FormControl('wontTell', [Validators.required]),
        aboutYou: new FormControl(null),
      }),
      useremail: new FormControl(null, [Validators.required, Validators.email]),
      secretSelect: new FormControl('pet', [Validators.required]),
      answear: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      matchpassword: new FormControl(null, [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  canComponentDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.isSaved) {
      return true;
    }
    if (this.registerForm.touched && !this.isSaved) {
      return confirm('Do you want to discard the changes');
    } else {
      return true;
    }
  }

  onRegisterSubnit() {
   console.log(this.registerForm);
  }
}
