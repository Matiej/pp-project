import { Component, Input } from '@angular/core';
import { User } from '../../user-model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent {
  @Input()
  userItem?: User;
  @Input()
  userNumer: number = 0;

  onDetailsClick( ) {
    throw new Error('Method not implemented.');
    }
}
