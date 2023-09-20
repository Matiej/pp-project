import { TaskUser } from './task-user-model';

export class UserInMemoryDatabase {
  private userDb: Map<string, TaskUser> = new Map();

  add(user: TaskUser): TaskUser {
    if (isNaN(user.id) || typeof user.id === 'undefined') {
      const nextId: number = parseInt(this.getCurrentId()) + 1;
      user.id = nextId;
      this.userDb.set(user.id.toString(), user);
      return user;
    } else {
      this.userDb.set(user.id.toString(), user);
      return user;
    }
  }

  get(id: number): TaskUser | undefined {
    return this.userDb.get(id.toString());
  }

  remove(id: number): boolean {
    return this.userDb.delete(id.toString());
  }

  listAllUsers(): Array<TaskUser> {
    return Array.from(this.userDb.values());
  }

  private getCurrentId(): string {
    if (this.userDb.size < 1) {
      return '0';
    }
    const sorted = Array.from(this.userDb.keys()).sort(
      (a, b) => parseInt(b) - parseInt(a)
    );
    return sorted[0];
  }
}
