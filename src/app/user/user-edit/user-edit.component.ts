import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDatabaseService } from '../service/user-database.service';
import { UserSharedService } from '../service/user-shared.service';
import { User } from '../user-model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css', '../user.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  showToast: boolean = false;
  userEditToastMessage: string = '';
  allowEdit: boolean = false;
  user?: User;
  paramSubscription?: Subscription;
  userSubscription?: Subscription;
  userForm!: FormGroup;
  userEditTitle: string = 'User Edit Section';

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

    this.route.queryParams.subscribe((queryParams: Params) => {
      console.log(queryParams['allowEdit']);
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
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
            }
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.paramSubscription?.unsubscribe();
  }

  onSaveButtonClick() {
    const formData = this.userForm.value;

    let userToSve = new User(
      formData.name,
      formData.lastName,
      formData.email,
      formData.birthYear
    );

    if (this.user!.id) {
      userToSve.id = this.user!.id;
    }

    this.userDatabaseService.saveUser(userToSve);
    this.userSharedSevice.updateUserDataNotify();
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
}
