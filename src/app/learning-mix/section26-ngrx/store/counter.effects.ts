import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { decrement, increment } from './counter.actions';

@Injectable()
export class CounterEffects {
  saveCount = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, decrement),
        tap((action) => {
          console.log('saving counter ------------ ', action);
          localStorage.setItem('counter', action.value.toString());
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
