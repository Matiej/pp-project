export class Server {
  constructor(private _serverName: string, 
    private _ipAddress: string,
    private _status: string) {}

  get serverName(): string {
    return this._serverName;
  }

  get ipAddress(): string {
    return this._ipAddress;
  }

  get status(): string {
    return this._status;
  }
}
