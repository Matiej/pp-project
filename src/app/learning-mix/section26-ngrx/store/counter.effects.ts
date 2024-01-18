import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { decrement, increment, init, set } from './counter.actions';
import { selectCount } from './counter.selectors';

@Injectable()
export class CounterEffects {
  readonly LOCALSTORAGE_ACTION_VALUE: string = 'action-value';
  readonly LOCALSTORAGE_COUNT_VALUE: string = 'counter-value';

  saveCount = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, decrement),
        withLatestFrom(this.store.select(selectCount)),
        tap(([action, counter]) => {
          console.log('saving counter action-value ------------ ', action);
          console.log('saving counter  counter-value ------------ ', counter);
          localStorage.setItem(
            this.LOCALSTORAGE_ACTION_VALUE,
            action.value.toString()
          );
          localStorage.setItem(
            this.LOCALSTORAGE_COUNT_VALUE,
            counter.toString()
          );
        })
      ),
    { dispatch: false }
  );

  loandCount = createEffect(() =>
    this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const storedCounter = localStorage.getItem(
          this.LOCALSTORAGE_COUNT_VALUE
        );
        if (storedCounter) {
          const storedCounterNumber: number = +storedCounter;
          console.log('load form localStorage my counter : ' + storedCounterNumber);
          return of(set({ value: storedCounterNumber }));
        }
        console.log('my localStorage counter seems to be null or undefined!')
        return of(set({ value: 0 }));
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<{ counterKey: number }>
  ) {}
}
