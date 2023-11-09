import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TOAST_MESSAGES } from 'src/app/constants/toast-messages';
import { UserDatabaseService } from '../service/user-database.service';
import { UserSharedService } from '../service/user-shared.service';
import { User } from '../user-model';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit, OnDestroy {
  isSaved: boolean = false;
  readonly registerFormTitle: string = 'Register your account';
  registerForm!: FormGroup;
  isSpinning: boolean = false;
  static allowedSectrets: string[] = ['pet', 'car', 'actor'];
  static allowedGenders: string[] = ['male', 'female', 'wontTell', 'other'];
  toastMessageClass: string = '';
  showToast: boolean = false;
  userToastMessage: string = '';

  constructor(
    private userSharedSevice: UserSharedService,
    private userDatabaseService: UserDatabaseService,
    private router: Router
  ) {}

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
        genderSelect: new FormControl(
          'wontTell',
          [Validators.required],
          [this.allowedGenderValidator]
        ),
        aboutYou: new FormControl(null),
      }),
      useremail: new FormControl(null, [Validators.required, Validators.email]),
      secretSelect: new FormControl(
        'pet',
        [Validators.required],
        [this.allowedSecretValidator]
      ),
      answer: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      matchpassword: new FormControl(null, [
        Validators.required,
        this.matchPasswordValidator.bind(this),
      ]),
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

  allowedSecretValidator(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const valueToCheck = control.value.toLowerCase();
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (UserRegisterComponent.allowedSectrets.includes(valueToCheck)) {
          resolve(null);
        } else {
          resolve({ isSecretFrobidden: true });
        }
      }, 1500);
    });
    return promise;
  }

  allowedGenderValidator(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const valueToCheck = control.value;
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (UserRegisterComponent.allowedGenders.includes(valueToCheck)) {
          resolve(null);
        } else {
          resolve({ isGenerForbidden: true });
        }
      }, 1000);
    });
    return promise;
  }

  matchPasswordValidator(control: FormControl): {
    [s: string]: boolean;
  } | null {
    if (
      this.registerForm &&
      this.registerForm?.get('password')?.value !== control.value
    ) {
      return { passwordNotMatch: true };
    }
    return null;
  }

  onRegisterSubnit() {
    const formData = this.registerForm.value;
    let userToSve = new User(
      formData.userData.username,
      formData.userData.surname,
      formData.userData.useremail,
      formData.userData.birthyear
    );

    userToSve.address1 = formData.userData.address1;
    userToSve.address2 = formData.userData.address2;
    userToSve.gender = formData.userData.genderSelect;
    userToSve.about = formData.userData.aboutYou;
    userToSve.secret = formData.secretSelect;
    userToSve.answer = formData.answer;
    userToSve.password = formData.password;
    userToSve.matchPassword = formData.matchpassword;
    console.log(userToSve);
    this.isSpinning = true;

    setTimeout(() => {
      this.userDatabaseService.saveUser(userToSve);
      this.userSharedSevice.updateUserDataNotify();

      this.isSaved = true;
      this.isSpinning = false;
      this.registerForm.reset();
      this.registerForm.patchValue({
        userData: {
          petSelect: 'car',
        },
        genderSelect: 'other',
      });
      this.showToastMessage(
        TOAST_MESSAGES.USER_REGISTERED_SUCCESSFULLY,
        2500,
        TOAST_MESSAGES.SUCCESS_MESSAGE_STYLE
      );
    }, 2500);
  }

  private showToastMessage(
    message: string,
    timeout: number,
    messageStyle: string
  ): void {
    this.userToastMessage = message;
    this.showToast = true;
    this.toastMessageClass = messageStyle;
    setTimeout(() => {
      this.showToast = false;
      this.userToastMessage = '';
      this.toastMessageClass = '';

      this.router.navigate(['user/login']);
    }, timeout);
  }
}
