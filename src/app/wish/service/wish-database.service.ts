import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { FirebaseWishDatabaseService } from '../db/firebase-wish-database.service';

import { WishItem } from '../wish-list/wish-item/wish-item-model';

@Injectable({
  providedIn: 'root',
})
export class WishDatabaseService {
  // private _whisItemDatabase!: InMemoryWishItemDataBase;

  constructor(
    private firebaseWishDatabaseService: FirebaseWishDatabaseService
  ) {
    // this._whisItemDatabase = new InMemoryWishItemDataBase();
  }

  // saveWishItem(item: WishItem): WishItem | undefined {
  //   return this._whisItemDatabase.add(item);
  // }

  saveWish(wish: WishItem): Observable<WishItem | undefined> {
    return this.firebaseWishDatabaseService.saveWish(wish).pipe(
      switchMap((savedWishID: { name: string }) => {
        return this.findWishByid(savedWishID.name);
      })
    );
  }

  public findWishByid(wishId: string): Observable<WishItem | undefined> {
    return this.firebaseWishDatabaseService.findWishById(wishId).pipe(
      map((resposne: HttpResponse<any>) => {
        if (resposne.status === 200) {
          return this.convertToWishItem(resposne.body, wishId);
        } else {
          return undefined;
        }
      })
    );
  }

  findAll(): Observable<WishItem[]> {
    return this.firebaseWishDatabaseService.findAllWishes().pipe(
      map((response) => {
        const wishies: WishItem[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            const wish = this.convertToWishItem(response[key], key);
            wishies.push(wish);
          }
        }
        return wishies;
      })
    );
  }

  removeById(id: string): Observable<boolean> {
   return this.firebaseWishDatabaseService.deleteWishById(id)
   .pipe(map((resposne: HttpResponse<any>) => {
      if(resposne.status ===200) {
        return true;
      } else {
        return false;
      }
   }));
     
 
  }

  getNumberOfItems(): number {
    return this.firebaseWishDatabaseService.findAllWishes.length;
  }

  private convertToWishItem(wishData: any, key: string): WishItem {
    const wishItem = new WishItem(
      wishData.name,
      wishData.type,
      wishData.descriptions,
      wishData.pictureUrl
    );
    wishItem.id = key;

    return wishItem;
  }
}
