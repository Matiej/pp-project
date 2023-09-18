import { WishItem } from '../wish-list/wish-item/wish-item-model';
export class InMemoryWishItemDataBase {
  private db: Map<string, WishItem> = new Map();

  add(item: WishItem): WishItem | undefined {
    if (isNaN(item.id) || typeof item.id === 'undefined') {
      const nextId: number = parseInt(this.getCurrentId()) + 1;
      item.id = nextId;
      this.db.set(item.id.toString(), item);

      return item;
    } else {
      this.db.set(item.id.toString(), item);

      return item;
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
