import { Injectable } from '@angular/core';
import { InMemoryDataBase } from './in-memory-database';
import { WishItem } from '../wish-list/wish-item/wish-item-model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDatabaseService {
  private _whisItemDatabase!: InMemoryDataBase;

  constructor() {
    this._whisItemDatabase = new InMemoryDataBase();
  }

  saveWishItem(item: WishItem): WishItem | undefined {
    return this._whisItemDatabase.add(item);
  }

  findById(id: number): WishItem | undefined {
    return this._whisItemDatabase.get(id.toString());
  }

  findAll(): WishItem[] {
    return this._whisItemDatabase.listAll();
  }

  removeById(id: number): boolean {
    return this._whisItemDatabase.remove(id.toString());
  }
}
