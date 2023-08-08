import { Component, OnInit } from '@angular/core';
import { Server } from '../server/server';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  serverName: string = '';
  serverCreatedMessage: string = '';
  isServerCreated: boolean = false;
  servers: Server[] = []
  serverForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.serverForm = this.fb.group({
      serverName:['', Validators.required],
      ipAddress:['', Validators.required]
    });
    this.setAddServerButtonTime();
  }

  ngOnInit(): void {
    this.getTestServers();
  }

  isDisabled(): boolean {
    return this.addServerButtonDisabled;
  }

  onClickAddServerButton(): void {
    this.addNewServer();  
    this.addServerButtonDisabled = !this.addServerButtonDisabled;
    this.setAddServerButtonTime();
    this.isServerCreated = true;
    this.clearForm();
  }

  private addNewServer() {
    const serverName = this.serverForm.get('serverName')!.value;
    const ipAddress = this.serverForm.get('ipAddress')!.value;
    this.servers.push(new Server(serverName, ipAddress, this.getSeverStatus()));
  }

  private clearForm() {
    this.serverForm.get('ipAddress')?.setValue("");
    this.serverForm.get('serverName')?.setValue("");
  }

  addNewServerInfo(): string {
    return this.addServerButtonDisabled
      ? "Now you can't add new server."
      : 'Add new server now.';
  }

  onUpdateServerName(serverName: Event): void {
    this.serverName = (<HTMLInputElement>serverName.target).value;
  }

  getTestServers(): void {
    this.servers.push(new Server("MyTestServer1", "192.168.2.1", this.getSeverStatus()));
    this.servers.push( new Server("MyTestServer2", "192.168.10.1", this.getSeverStatus()));
  }

  private setAddServerButtonTime(): void {
    setTimeout(() => {
      (this.addServerButtonDisabled = false), (this.isServerCreated = false);
    }, 1500);
  }

  private getSeverStatus(): string {
    return Math.random() > 0.5 ? "online" : "offline";
  }

  private getServerIpAddress(): string {
    return "localhost";
  }

}
