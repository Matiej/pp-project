import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ASSETS_PATHS } from 'src/app/constants/assets-paths';
import { Section15ShareService } from '../section15-share.service';
import { UserFormModel } from '../user.form.model';

@Component({
  selector: 'app-example-forms-view',
  templateUrl: './example-forms-view.component.html',
  styleUrls: ['./example-forms-view.component.css'],
})
export class ExampleFormsViewComponent implements OnInit, OnDestroy {
  readonly userImage: string = ASSETS_PATHS.USER_IMAGE_ICON;
  private _formSubscription: Subscription = new Subscription();
  user!: UserFormModel;
  userCardTitle: string = 'No User details available';
  constructor(private section15Service: Section15ShareService) {}

  ngOnInit(): void {
    this.section15Service.userFormSender.subscribe((user: UserFormModel) => {
      this.userCardTitle = 'Submitted User details';
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    if (this._formSubscription) {
      this._formSubscription.unsubscribe();
    }
  }
}
