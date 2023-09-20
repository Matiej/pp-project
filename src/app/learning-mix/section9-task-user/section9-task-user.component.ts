import { Component } from '@angular/core';
import { Section9TaskService } from './section9-task.service';
import { TaskUser } from './task-user-model';
import { TaskUserStatus } from './user-status-enum';

@Component({
  selector: 'app-section9-task-user',
  templateUrl: './section9-task-user.component.html',
  styleUrls: ['./section9-task-user.component.css'],
})
export class Section9TaskUserComponent {
  clickCounter: number = 0;

  constructor(private section9TaskService: Section9TaskService) {
    section9TaskService.incraseClickCounter.subscribe(() => {
      this.clickCounter += 1;
    });
    this.preapreDefaultUsers();
  }

  private preapreDefaultUsers() {
    const user1 = new TaskUser('Joh', TaskUserStatus.ACTIVE);
    this.section9TaskService.saveUser(user1);
    const user2 = new TaskUser('Mike', TaskUserStatus.ACTIVE);
    this.section9TaskService.saveUser(user2);
    const user3 = new TaskUser('Anna', TaskUserStatus.ACTIVE);
    this.section9TaskService.saveUser(user3);
    const user4 = new TaskUser('Julia', TaskUserStatus.INACTIVE);
    this.section9TaskService.saveUser(user4);
    const user5 = new TaskUser('Monika', TaskUserStatus.ACTIVE);
    this.section9TaskService.saveUser(user5);
    const user6 = new TaskUser('Franciesco', TaskUserStatus.INACTIVE);
    this.section9TaskService.saveUser(user6);
  }
}
