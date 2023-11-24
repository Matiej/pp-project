import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/auth/can-deactivate-guard.service';
import { TOAST_MESSAGES } from 'src/app/constants/toast-messages';
import { UserDatabaseService } from '../service/user-database.service';
import { UserSharedService } from '../service/user-shared.service';
import { User } from '../user-model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css', '../user.component.css'],
})
export class UserEditComponent
  implements OnInit, OnDestroy, CanComponentDeactivate
{
  allowEdit: boolean = false;
  user?: User;
  paramSubscription?: Subscription;
  userSubscription?: Subscription;
  userForm!: FormGroup;
  userEditTitle: string = 'User Edit Section';
  buttonName = '';
  changesSaved: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userDatabaseService: UserDatabaseService,
    private route: ActivatedRoute,
    private userSharedSevice: UserSharedService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      birthYear: ['', Validators.required],
    });

    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      const userId: string = params['id'];
      if (userId && userId !== undefined) {
        this.userSharedSevice.showSpinner(true);
        this.userDatabaseService.findUserById(userId).subscribe((data) => {
          if (data) {
            this.user = data;
            this.fillOutForm(data);
            this.userSharedSevice.showSpinner(false);
          }
          this.userSharedSevice.showSpinner(false);
        });
      }
    });

    this.route.queryParams.subscribe((queryParams: Params) => {
      this.editComponentAction(queryParams);
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.paramSubscription?.unsubscribe();
  }

  canComponentDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.allowEdit) {
      return true;
    }
    if (this.isAnyUserFiledHasChanged(this.user)) {
      return confirm('Do you want to discard the changes');
    } else {
      return true;
    }
  }

  private isAnyUserFiledHasChanged(currentUser?: User): boolean {
    const formData = this.userForm.value;

    if (
      this.user &&
      (this.user.name !== formData.name ||
        this.user.email !== formData.email ||
        this.user.lastName !== formData.lastName ||
        this.user.birthYear !== formData.birthYear) &&
      !this.changesSaved
    ) {
      return true;
    } else if (
      !this.user &&
      (formData.name !== '' ||
        formData.email !== '' ||
        formData.lastName !== '' ||
        formData.birthYear !== '') &&
      !this.changesSaved
    ) {
      return true;
    } else {
      return false;
    }
  }

  public onButtonClick() {
    this.userSharedSevice.showSpinner(true);
    const formData = this.userForm.value;
    let userToSve = new User(
      formData.name,
      formData.lastName,
      formData.email,
      formData.birthYear,
      true
    );
    this.changesSaved = true;

    if (this.user && this.user.id) {
      const userToUpdate = this.mergeUpdatedUser(userToSve, this.user);

      this.subUser(this.userDatabaseService.updateUserFirebase(userToUpdate));
    } else {
      this.subUser(this.userDatabaseService.saveUserFirebase(userToSve));
    }
  }

  private mergeUpdatedUser(dataToUpdate: User, currentUser: User): User {
    currentUser.name = dataToUpdate.name;
    currentUser.email = dataToUpdate.email;
    currentUser.lastName = dataToUpdate.lastName;
    currentUser.birthYear = dataToUpdate.birthYear;
    return currentUser;
  }

  private subUser(userSub: Observable<User | undefined>): void {
    userSub.subscribe(
      (user: User | undefined) => {
        if (user) {
          this.userSharedSevice.updateUserDataNotify();
          this.userSharedSevice.sendToastMessage(
            TOAST_MESSAGES.USER_SAVED_SUCCESSFULLY,
            TOAST_MESSAGES.SUCCESS_MESSAGE_STYLE,
            3000
          );

          this.userSharedSevice.showSpinner(false);
        } else {
          this.userSharedSevice.updateUserDataNotify();
          this.userSharedSevice.updateUserDataNotify();

          this.userSharedSevice.sendToastMessage(
            TOAST_MESSAGES.ERROR_ADDING_USER,
            TOAST_MESSAGES.DANGER_MESSAGE_BIG_STYLE,
            4000
          );

          this.userSharedSevice.showSpinner(false);
        }
      },
      (error: HttpErrorResponse) => {
        this.userSharedSevice.showSpinner(false);
        this.userSharedSevice.updateUserDataNotify();
        this.userSharedSevice.sendToastMessage(
          TOAST_MESSAGES.ERROR_USER_REMOVING + '---' + error.error.error,
          TOAST_MESSAGES.DANGER_MESSAGE_BIG_STYLE,
          4000
        );
      }
    );
  }

  private fillOutForm(user: User): void {
    let valueToSet = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      birthYear: user.birthYear,
    };

    this.userForm.setValue(valueToSet);
  }

  private editComponentAction(queryParams: Params): void {
    const componentVer: string = queryParams['version'];
    if ('newComponent' === componentVer) {
      this.userEditTitle = 'New User Section';
      this.buttonName = 'Add User';
    } else {
      this.userEditTitle = 'User Edit Section';
      this.buttonName = 'Save Changes';
    }
  }

  isButtonDisable(): boolean {
    return !this.userForm.valid;
  }
}
