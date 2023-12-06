import { AuthResponseData } from "../auth/authResponse";

export class User {
  private _id!: string;
  public name: string;
  public lastName: string;
  public email: string;
  public birthYear: number;
  public editable: boolean;
  private _password!: string;
  private _matchPassword!: string;
  private _address1!: string;
  private _address2!: string;
  private _gender!: string;
  private _secret!: string;
  private _answer!: string;
  private _about!: string;
  private _fireBaseAuthData!: AuthResponseData;

  constructor(
    name: string,
    lastName: string,
    email: string,
    birthYear: number,
    editable: boolean
  ) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.birthYear = birthYear;
    this.editable = editable;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get matchPassword(): string {
    return this._matchPassword;
  }

  set matchPassword(value: string) {
    this._matchPassword = value;
  }

  get address1(): string {
    return this._address1;
  }

  set address1(value: string) {
    this._address1 = value;
  }

  get address2(): string {
    return this._address2;
  }

  set address2(value: string) {
    this._address2 = value;
  }

  get gender(): string {
    return this._gender;
  }

  set gender(value: string) {
    this._gender = value;
  }

  get secret(): string {
    return this._secret;
  }

  set secret(value: string) {
    this._secret = value;
  }

  get answer(): string {
    return this._answer;
  }

  set answer(value: string) {
    this._answer = value;
  }

  public get about(): string {
    return this._about;
  }
  public set about(value: string) {
    this._about = value;
  }

  public get fireBaseAuthData(): AuthResponseData {
    return this._fireBaseAuthData;
  }
  public set fireBaseAuthData(value: AuthResponseData) {
    this._fireBaseAuthData = value;
  }
}
