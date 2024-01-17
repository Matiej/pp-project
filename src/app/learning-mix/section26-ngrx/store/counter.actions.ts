import { createAction, props } from '@ngrx/store';

export const increment = createAction(
  '[counter] Increment',
  props<{ value: number }>()
);

export const decrement = createAction(
  '[counter] Decrement',
  props<{ value: number }>()
);
