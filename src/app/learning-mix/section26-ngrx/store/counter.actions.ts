import { createAction, props } from '@ngrx/store';

export const increment = createAction(
  '[counter] Increment',
  props<{ value: number }>()
);

export const decrement = createAction(
  '[counter] Decrement',
  props<{ value: number }>()
);

export const init = createAction('[counter] Init');

export const set = createAction('[counter] Set', props<{ value: number }>());
