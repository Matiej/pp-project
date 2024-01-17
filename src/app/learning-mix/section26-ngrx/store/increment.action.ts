import { Action } from '@ngrx/store';

export class IncrementAction implements Action {
  readonly type: string = '[counter] Increment';

  constructor(public value: number) {}
}

//this solution should be avoided