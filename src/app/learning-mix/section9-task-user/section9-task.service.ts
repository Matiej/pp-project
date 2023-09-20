import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TaskUserDataBaseService } from './task-user-database.service';
import { TaskUser } from './task-user-model';
import { TaskUserStatus } from './user-status-enum';

@Injectable({
  providedIn: 'root',
})
export class Section9TaskService {
  incraseClickCounter: EventEmitter<void> = new EventEmitter;
  refreshUserComponetnsList: EventEmitter<void> = new EventEmitter;

  constructor(private taskUserDataBaseService: TaskUserDataBaseService) {}

  getTaskUsers(userStatus: TaskUserStatus): Observable<TaskUser[]> {
    return of(this.taskUserDataBaseService.findAllByStatus(userStatus));
  }

  saveUser(user: TaskUser): TaskUser {
    const savedUser = this.taskUserDataBaseService.saveTaskUser(user);
    if (savedUser?.id) {
      return savedUser;
    } else {
      throw new Error();
    }
  }

  onUserChangeStatusActions():void {
    this.addToClickCounter();
    this.refreshList();
  }

  private addToClickCounter():void {
    this.incraseClickCounter.emit();
  }

  private refreshList():void {
    this.refreshUserComponetnsList.emit();
  }
}
