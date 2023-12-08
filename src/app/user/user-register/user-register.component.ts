import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData } from 'src/app/auth/auth-response-data';
import { AuthService } from 'src/app/auth/auth.service';
import { TOAST_MESSAGES } from 'src/app/constants/toast-messages';
import { UserDatabaseService } from '../service/user-database.service';
import { UserSharedService } from '../service/user-shared.service';
import { User } from '../user-model';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
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
    private router: Router,
    private authService: AuthService
  ) {
    //is necessary because fuction is out of scoop for this
    this.emailExistValidator = this.emailExistValidator.bind(this);
  }

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
        editRadio: new FormControl('Uneditable'),
        aboutYou: new FormControl(null),
      }),
      useremail: new FormControl(
        null,
        [Validators.required, Validators.email],
        [this.emailExistValidator]
      ),
      secretSelect: new FormControl(
        'pet',
        [Validators.required],
        [this.allowedSecretValidator]
      ),
      answer: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      matchpassword: new FormControl(null, [
        Validators.required,
        this.matchPasswordValidator.bind(this),
      ]),
    });
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

  emailExistValidator(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const emialToCheck = control.value;
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        this.userDatabaseService.findByEmail(emialToCheck).subscribe((data) => {
          if (data && data.email == emialToCheck) {
            resolve({ isEmailExist: true });
          } else {
            resolve(null);
          }
        });
      }, 2000);
    });
    return promise;
  }

  onRegisterSubnit() {
    if (!this.registerForm.valid) {
      return;
    }

    const formData = this.registerForm.value;

    let userToSave = new User(
      formData.userData.username,
      formData.userData.surname,
      formData.useremail,
      formData.userData.birthyear,
      formData.userData.editRadio === 'Editable' ? true : false
    );

    userToSave.address1 = formData.userData.address1;
    userToSave.address2 = formData.userData.address2;
    userToSave.gender = formData.userData.genderSelect;
    userToSave.about = formData.userData.aboutYou;
    userToSave.secret = formData.secretSelect;
    userToSave.answer = formData.answer;
    userToSave.password = formData.password;
    userToSave.matchPassword = formData.matchpassword;

    this.isSpinning = true;

    this.authService
      .signUpFireBaseUser(userToSave.email, userToSave.password)
      .subscribe(
        (data: AuthResponseData) => {
          
          this.saveUser(userToSave);
        },
        (error: HttpErrorResponse) => {
          this.handleError(error);
        }
      );
  }

  private saveUser(userToSave: User): void {
    this.userDatabaseService.saveUserFirebase(userToSave).subscribe(
      (user: User | undefined) => {
        if (user) {
          this.isSaved = true;
          this.registerForm.reset();
          this.registerForm.patchValue({
            userData: {
              petSelect: 'car',
              editRadoi: 'Uneditable',
            },
            genderSelect: 'other',
          });
          this.userSharedSevice.updateUserDataNotify();
          this.isSpinning = false;
          this.showToastMessage(
            TOAST_MESSAGES.USER_REGISTERED_SUCCESSFULLY,
            2500,
            TOAST_MESSAGES.SUCCESS_MESSAGE_STYLE
          );
        } else {
          this.isSaved = false;
          this.isSpinning = false;
          this.showToastMessage(
            TOAST_MESSAGES.USER_REGISTERED_ERROR,
            2500,
            TOAST_MESSAGES.ERROR_ADDING_USER
          );
        }
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    );
  }
  
  private handleError(error: HttpErrorResponse): void {
    this.isSaved = false;
    this.isSpinning = false;
    let errorMessage = 'An uknown error occurred';
    if (!error.error || !error.error.error) {
      errorMessage =
        TOAST_MESSAGES.USER_REGISTERED_ERROR + '-----' + errorMessage;
    }
    errorMessage =
      TOAST_MESSAGES.USER_REGISTERED_ERROR +
      '-----' +
      error.error.error.message;
    this.showToastMessage(
      errorMessage,
      4500,
      TOAST_MESSAGES.DANGER_MESSAGE_BIG_STYLE
    );
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
