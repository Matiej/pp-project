import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  // zmieniajac char z ' na ` mozna ukladac w rozny sposobi takze wpisac kod thml
  // template: `
  // <h4>Servers working and contains: </h4>
  // <b style="margin-left: 10px;">1.</b>
  // <app-server></app-server>
  // <b style="margin-left: 10px;">2.</b>
  // <app-server></app-server>`,
  // styleUrls: ['./servers.component.css'],
  styles: [
    `
      h4 {
        color: darkcyan;
        text-shadow: 2px 5px 8px #eaf94d;
      }
    `,
  ],
})
export class ServersComponent implements OnInit {
// styleUrls: ['./servers.component.css'],

  private addServerButtonDisabled: boolean = true;
  private addServerInfo: string = "Now you can't add new server.";
  serverName: string = "";
  serverCreatedMessage: string = "";

  constructor() {
    this.setAddServerButtonTime();
  }

  ngOnInit(): void {}

  isDisabled(): boolean {
    return this.addServerButtonDisabled;
  }

  onClickAddServerButton(): void {
    this.addServerButtonDisabled = !this.addServerButtonDisabled;
    this.setAddServerButtonTime();
  }

  addNewServerInfo(): string {
    return this.addServerButtonDisabled
      ? "Now you can't add new server."
      : 'Add new server now.';
  }

  onUpdateServerName(serverName: Event): void {
    this.serverName = (<HTMLInputElement>serverName.target).value;
    }

  private setAddServerButtonTime(): void {
    setTimeout(() => (this.addServerButtonDisabled = false), 1500);
  }
}
