import { Component, OnInit } from '@angular/core';
import { UnitUserService } from './unit-user.service';

@Component({
  selector: 'app-unit-user',

  templateUrl: './unit-user.component.html',
  styleUrl: './unit-user.component.css',
})
export class UnitUserComponent implements OnInit {
  isUnitUserLoggedIn: boolean = false;
  user: { name: string; age: number };

  constructor(private unitUserService: UnitUserService) {
    this.user = { name: 'Maciej', age: 100 };
  }

  ngOnInit(): void {
    this.user = this.unitUserService.user;
  }
}
