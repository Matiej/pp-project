export class Detail {
  constructor(private _counter: number, private _timestamp: Date) {}

  get counter(): number {
    return this._counter;
  }
  get timestamp(): Date {
    return this._timestamp;
  }
}
