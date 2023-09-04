import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css'],
})
export class GameControlComponent {
  isStartButtonDisable: boolean = false;
  isStopButtonDisable: boolean = true;
  @Output()
  statGame: EventEmitter<void> = new EventEmitter();
  @Output()
  stopGame: EventEmitter<void> = new EventEmitter();

  onStartButtonClick() {
    this.statGame.next();
    this.isStartButtonDisable = true;
    this.isStopButtonDisable = false;
  }

  onStopButtonClick() {
    this.stopGame.next();
    this.isStartButtonDisable = false;
    this.isStopButtonDisable = true;
  }
}
