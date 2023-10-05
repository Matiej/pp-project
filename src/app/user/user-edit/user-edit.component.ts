import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { TOAST_MESSAGES } from 'src/app/constants/toast-messages';
import { UserDatabaseService } from '../service/user-database.service';
import { UserSharedService } from '../service/user-shared.service';
import { User } from '../user-model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css', '../user.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  allowEdit: boolean = false;
  user?: User;
  paramSubscription?: Subscription;
  userSubscription?: Subscription;
  userForm!: FormGroup;
  userEditTitle: string = 'User Edit Section';
  buttonName = '';

  constructor(
    private fb: FormBuilder,
    private userDatabaseService: UserDatabaseService,
    private route: ActivatedRoute,
    private userSharedSevice: UserSharedService
  ) {}

  ngOnInit(): void {
    console.log('edit component ngoninit');
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      birthYear: ['', Validators.required],
    });

    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      const userId: string = params['id'];
      if (userId && !Number.isNaN(userId)) {
        this.userDatabaseService
          .findById(Number.parseFloat(userId))
          .subscribe((data) => {
            if (data) {
              this.user = data;
              this.fillOutForm(data);
              console.log(this.userForm);
            }
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

  public onButtonClick() {
    const formData = this.userForm.value;

    let userToSve = new User(
      formData.name,
      formData.lastName,
      formData.email,
      formData.birthYear
    );

    if (this.user && this.user.id) {
      userToSve.id = this.user.id;
    }

    this.userDatabaseService.saveUser(userToSve);
    this.userSharedSevice.updateUserDataNotify();
    this.userSharedSevice.sendToastMessage(
      TOAST_MESSAGES.USER_ADDED_SUCCESSFULLY,
      TOAST_MESSAGES.SUCCESS_MESSAGE_STYLE
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
