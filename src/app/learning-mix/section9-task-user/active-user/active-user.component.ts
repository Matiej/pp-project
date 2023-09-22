import { Component, EventEmitter, OnInit } from '@angular/core';
import { Section9TaskService } from '../section9-task.service';
import { TaskUser } from '../task-user-model';
import { TaskUserStatus } from '../user-status-enum';

@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.css'],
})
export class ActiveUserComponent implements OnInit {
  activeUsers: TaskUser[] = [];
  userChnageStatusNotifications: EventEmitter<void> = new EventEmitter();

  constructor(private section9TaskService: Section9TaskService) {
    section9TaskService.refreshUserComponetnsList.subscribe(() => {
      this.subScribeUsers();
    });
  }

  ngOnInit(): void {
    this.subScribeUsers();
  }

  onSetToInactive(user: TaskUser) {
    user.status = TaskUserStatus.INACTIVE;
    const savedUser = this.section9TaskService.saveUser(user);
    if (savedUser.status === TaskUserStatus.INACTIVE) {
      this.section9TaskService.onUserChangeStatusActions();
    }
  }

  private subScribeUsers(): void {
    this.section9TaskService
      .getTaskUsers(TaskUserStatus.ACTIVE)
      .subscribe((taskUsers: TaskUser[]) => {
        this.activeUsers = taskUsers;
      });
  }
}
