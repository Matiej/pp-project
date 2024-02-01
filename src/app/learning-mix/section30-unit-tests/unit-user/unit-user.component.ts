import { Component, OnInit } from '@angular/core';
import { UnitSharedService } from '../shared/unit-shared.service';
import { UnitUserService } from './unit-user.service';

@Component({
  selector: 'app-unit-user',

  templateUrl: './unit-user.component.html',
  styleUrl: './unit-user.component.css',
})
export class UnitUserComponent implements OnInit {
  isUnitUserLoggedIn: boolean = false;
  user: { name: string; age: number };
  myData: string | undefined;

  constructor(
    private unitUserService: UnitUserService,
    private unitShared: UnitSharedService
  ) {
    this.user = { name: 'Maciej', age: 100 };
  }

  ngOnInit(): void {
    this.user = this.unitUserService.user;
    this.unitShared.getDetails().then((details) => {
      this.myData = details;
    });
  }
}
