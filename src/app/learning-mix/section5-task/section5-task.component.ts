import { Component, OnDestroy } from '@angular/core';
import { GANE_MESSAGES as GAME_MESSAGES } from './game-messages-constat';

@Component({
  selector: 'app-section5-task',
  templateUrl: './section5-task.component.html',
  styleUrls: ['./section5-task.component.css'],
})
export class Section5TaskComponent implements OnDestroy {
  private _tickIntrecement: number = 0;
  private _intervalId?: number;
  evenNumbers: number[] = [];
  oddNumbers: number[] = [];

  ngOnDestroy(): void {
    this.clearTickInterval();
  }

  onStartGame() {
    if (!this._intervalId) {
      this._intervalId = window.setInterval(() => {
        this.intrecmentTick();
        if(this._tickIntrecement % 2 === 0) {
        this.evenNumbers.push(this._tickIntrecement);
        } else {
          this.oddNumbers.push(this._tickIntrecement);
        }
      }, 1000);
    }
  }

  onStopGame() {
    this._tickIntrecement = 0;
    this.clearTickInterval();
  }

  private intrecmentTick(): void {
    this._tickIntrecement++;
  }

  get tickIntrecement(): number {
    return this._tickIntrecement;
  }

  private clearTickInterval(): void {
    clearInterval(this._intervalId);
    this._intervalId = undefined;
  }

  get gameMessage(): string {
    return this.tickIntrecement % 2 === 0
      ? GAME_MESSAGES.EVEN_MESSAGE
      : GAME_MESSAGES.ODD_MESSAGE;
  }
}
