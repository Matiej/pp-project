import { Component, OnInit } from '@angular/core';
import { Section9TaskService } from '../section9-task.service';
import { TaskUser } from '../task-user-model';
import { TaskUserStatus } from '../user-status-enum';

@Component({
  selector: 'app-inactive-user',
  templateUrl: './inactive-user.component.html',
  styleUrls: ['./inactive-user.component.css'],
})
export class InactiveUserComponent implements OnInit {
  inactiveUsers: TaskUser[] = [];

  constructor(private section9TaskService: Section9TaskService) {
    section9TaskService.refreshUserComponetnsList.subscribe(() => {
      this.subScribeUsers();
    });
  }

  ngOnInit(): void {
    this.subScribeUsers();
  }

  onSetToActive(user: TaskUser) {
    user.status = TaskUserStatus.ACTIVE;
    const savedUser = this.section9TaskService.saveUser(user);
    if (savedUser.status === TaskUserStatus.ACTIVE) {
      this.section9TaskService.onUserChangeStatusActions();
    }
  }

  private subScribeUsers(): void {
    this.section9TaskService
      .getTaskUsers(TaskUserStatus.INACTIVE)
      .subscribe((taskUsers: TaskUser[]) => {
        this.inactiveUsers = taskUsers;
      });
  }
}
