import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
})
export class ServerComponent {
  serverId: number = 11;
  serverStatus: string = "unknown";

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? "online" : "offline";
  }

  getColor(): string {
    return this.serverStatus == "offline" ? "red" : "green";
  }

  getStyles() {
    return {
        backgroundColor: this.serverStatus == "offline" ? "red" : "#8FDF64",
        fontSize: this.serverStatus === "offline" ? "20px" : "19px",
        fontStyle: "italic",
        fontWeight: this.serverStatus === "offline" ? "bold" : "normal"
    }
  }
}
