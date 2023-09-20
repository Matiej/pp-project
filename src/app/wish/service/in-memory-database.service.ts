import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InMemoryWishItemDataBase } from '../db/in-memory-wishItem-database';
import { WishItem } from '../wish-list/wish-item/wish-item-model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDatabaseService {
  private _whisItemDatabase!: InMemoryWishItemDataBase;

  constructor() {
    this._whisItemDatabase = new InMemoryWishItemDataBase();
  }

  saveWishItem(item: WishItem): WishItem | undefined {
    return this._whisItemDatabase.add(item);
  }

  findById(id: number): Observable<WishItem | undefined> {
    return of(this._whisItemDatabase.get(id.toString()));
  }

  findAll(): Observable<WishItem[]> {
 
    return of(this._whisItemDatabase.listAll());
  }

  removeById(id: number): boolean {
    return this._whisItemDatabase.remove(id.toString());
  }

  getNumberOfItems(): number {
    return this._whisItemDatabase.listAll().length;
  }
}
