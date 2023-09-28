export class User {
  private _id!: number;
  public name: string;
  public lastName: string;
  public email: string;
  public birthYear: number;

  constructor(
    name: string,
    lastName: string,
    email: string,
    birthYear: number
  ) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.birthYear = birthYear;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
}
