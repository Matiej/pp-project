import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-custom-observables',
  templateUrl: './custom-observables.component.html',
  styleUrls: ['./custom-observables.component.css'],
})
export class CustomObservablesComponent implements OnInit, OnDestroy {
  myObsArray: number[] = [];
  secondObsNumber: number = 0;
  counterErrorMessage: string = '';
  private _firstObservableSubscription?: Subscription;
  private _secondObservableSubscription?: Subscription;
  isCompleted: boolean = false;
  completedMessage: string = '';
  customIntervalObservable = Observable.create((obs: any) => {
    let count = 0;
    const intervalId = setInterval(() => {
      obs.next(count);

      if (count === 2) {
        clearInterval(intervalId);
        obs.complete();
        return;
      }

      if (count > 3) {
        clearInterval(intervalId);
        obs.error(new Error('Second custom counter is greater then 3 !!!'));
        return;
      }

      count++;
      this.secondObsNumber = count;
    }, 1000);
  });

  ngOnInit(): void {
    this._firstObservableSubscription = interval(500).subscribe((value) => {
      console.log('my first custom observable value: ', value);
      if (this.myObsArray.length > 3) {
        this._firstObservableSubscription?.unsubscribe();
      }
      this.myObsArray.push(value);
    });

    this._secondObservableSubscription =
      this.customIntervalObservable.subscribe(
        (value: any) => {
          console.log('my antoher custom observable value: ', value);
        },
        (error: Error) => {
          this.counterErrorMessage = error.message;
          console.error('Error occured while counting: ', error.message);
        },
        () => {
          this.completedMessage =
            'SecondCustomObservable completed with value: ' +
            this.secondObsNumber;
          this.isCompleted = true;
          console.warn(this.completedMessage);
        }
      );
  }

  ngOnDestroy(): void {
    if (this.myObsArray.length > 3) {
      this._firstObservableSubscription?.unsubscribe();
    }
    this._secondObservableSubscription?.unsubscribe();
  }
}
