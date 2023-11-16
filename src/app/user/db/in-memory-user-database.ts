import { User } from '../user-model';
export class InMemoryUserDataBase {
  private db: Map<string, User> = new Map();

  add(item: User): User | undefined {
    if (item.id || typeof item.id === 'undefined') {
      const nextId: string = (parseInt(this.getCurrentId()) + 1).toString();
      item.id = nextId;
      this.db.set(item.id.toString(), item);

      return item;
    } else {
      this.db.set(item.id.toString(), item);

      return item;
    }
  }

  get(id: string): User | undefined {
    return this.db.get(id);
  }

  remove(id: string): boolean {
    return this.db.delete(id);
  }

  listAll(): Array<User> {
    return Array.from(this.db.values());
  }

  private getCurrentId(): string {
    if (this.db.size < 1) {
      return '0';
    }
    const sorted = Array.from(this.db.keys()).sort(
      (a, b) => parseInt(b) - parseInt(a)
    );
    return sorted[0];
  }
}
