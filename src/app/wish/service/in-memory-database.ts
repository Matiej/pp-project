import { WishItem } from '../wish-list/wish-item/wish-item-model';
export class InMemoryDataBase {
  private db: Map<string, WishItem> = new Map();

  add(item: WishItem): WishItem | undefined {
    if (item.id) {
      this.db.set(item.id.toString(), item);
      return this.db.get(item.id.toString());
    } else {
      const nextId: number = this.db.values.length + 1;
      this.db.set(nextId.toString(), item);
      return this.db.get(nextId.toString());
    }
  }

  get(id: string): WishItem | undefined {
    return this.db.get(id);
  }

  remove(id: string): boolean {
    return this.db.delete(id);
  }

  listAll(): Array<WishItem> {
    return Array.from(this.db.values());
  }
}
