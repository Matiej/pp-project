import { Component } from '@angular/core';

@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html',
  styleUrls: ['./user-task.component.css'],
})
export class UserTaskComponent {
  readonly userPlaceHolder: string = 'Enter your username';
  kickOffMessage: string = '';
  username = '';
  isMessageVisible: boolean = false;

  isKickUserButtonDisable(): boolean {
    return this.username.trim().length < 1;
  }

  onKickUser() {
    this.showMessage();
    this.kickedOffUserMessage(this.username);
    this.username = '';
  }

  kickedOffUserMessage(name: string) {
    this.kickOffMessage = 'User named: ' + name + ' kicked off!';
  }

  private showMessage() {
    this.isMessageVisible = !this.isMessageVisible;
    setTimeout(() => (this.isMessageVisible = false), 2000);
  }
}
