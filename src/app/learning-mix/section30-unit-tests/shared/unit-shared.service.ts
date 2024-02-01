import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UnitSharedService {
  constructor() {}

  public getDetails(): Promise<string> {
    const resultPromise = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        resolve('data');
      }, 2000);
    });
    return resultPromise;
  }
}
