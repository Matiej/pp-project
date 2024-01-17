import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Section26Service {
  counter = 0;
  counterChanged = new Subject<number>();

  constructor() {}

  public decrement() {
    this.counter--;
    this.counterChanged.next(this.counter);
  }
  public increment() {
    this.counter++;
    this.counterChanged.next(this.counter);
  }
}
