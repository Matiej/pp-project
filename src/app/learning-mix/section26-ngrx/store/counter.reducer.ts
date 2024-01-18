import { createReducer, on } from '@ngrx/store';
import { decrement, increment, set } from './counter.actions';

const initalState = 0;

export const counterReducer = createReducer(
  initalState,
  on(increment, (state, actionAgrument) => state + actionAgrument.value),
  on(decrement, (state, actionArgument) => state - actionArgument.value),
  on(set, (state, actionArgument) => actionArgument.value)
);
