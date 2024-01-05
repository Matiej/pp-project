import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { FirebaseWishDatabaseService } from '../db/firebase-wish-database.service';

import { WishItemDescription } from '../wish-list/wish-item/wish-item-description';
import { WishItem } from '../wish-list/wish-item/wish-item-model';

@Injectable({
  providedIn: 'root',
})
export class WishDatabaseService {
  constructor(
    private firebaseWishDatabaseService: FirebaseWishDatabaseService
  ) {}

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
    return this.firebaseWishDatabaseService.deleteWishById(id).pipe(
      map((resposne: HttpResponse<any>) => {
        if (resposne.status === 200) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  private convertToWishItem(wishData: any, key: string): WishItem {
    const wishItem = new WishItem(
      wishData.name,
      wishData.type,
      this.convertToWishItemDescription(wishData.descriptions),
      wishData.pictureUrl
    );
    wishItem.id = key;
    wishItem.userId = wishData._userId;

    return wishItem;
  }

  private convertToWishItemDescription(
    descriptions: any[]
  ): WishItemDescription[] {
    const wishItemDescriptions: WishItemDescription[] = [];
    descriptions.forEach((description) => {
      const desc = new WishItemDescription(
        description._name,
        description._content
      );
      wishItemDescriptions.push(desc);
    });
    return wishItemDescriptions;
  }
}
