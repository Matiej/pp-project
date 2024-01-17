import { createReducer, on } from '@ngrx/store';
import { decrement, increment } from './counter.actions';

const initalState = 0;

export const counterReducer = createReducer(
  initalState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1)
);
