import { Injectable } from '@angular/core';
import { TaskUser } from './task-user-model';
import { UserInMemoryDatabase } from './user-inmemory-database';
import { TaskUserStatus } from './user-status-enum';

@Injectable({
  providedIn: 'root',
})
export class TaskUserDataBaseService {
  private _userInMemoryDatabase!: UserInMemoryDatabase;

  constructor() {
    this._userInMemoryDatabase = new UserInMemoryDatabase();
  }

  saveTaskUser(taskUser: TaskUser): TaskUser | undefined {
    return this._userInMemoryDatabase.add(taskUser);
  }

  findById(id: number): TaskUser | undefined {
    return this._userInMemoryDatabase.get(id);
  }

  findAll(): TaskUser[] {
    return this._userInMemoryDatabase.listAllUsers();
  }

  removeById(id: number): boolean {
    return this._userInMemoryDatabase.remove(id);
  }

  findAllByStatus(status: TaskUserStatus): TaskUser[] {
    return this._userInMemoryDatabase
      .listAllUsers()
      .filter((user) => user.status === status);
  }
}
