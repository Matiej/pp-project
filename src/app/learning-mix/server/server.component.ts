import { Component, Input } from '@angular/core';
import { Server } from './server';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent {
  @Input()
  currentServer:Server | undefined;

  constructor() {
    // this.serverStatus = Math.random() > 0.5 ? "online" : "offline";
  }

  getColor(): string {
    return this.currentServer?.status == "offline" ? "red" : "green";
  }

  getStyles() {
    return {
        backgroundColor: this.currentServer?.status == "offline" ? "red" : "#8FDF64",
        fontSize: this.currentServer?.status === "offline" ? "20px" : "19px",
        fontStyle: "italic",
        fontWeight: this.currentServer?.status === "offline" ? "bold" : "normal"
    }
  }
}
