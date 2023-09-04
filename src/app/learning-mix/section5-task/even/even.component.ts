import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.css'],
})
export class EvenComponent {
  @Input({ alias: 'evenGameNumber', required: true })
  gameNumber?: number;
  @Input({ alias: 'evenTextToShow', required: true })
  textToShow?: string;

  get textToDiplay(): string {
    if (this.gameNumber && this.textToShow) {
      return this.textToShow + ': ' + this.gameNumber + '.';
    }

    return 'Sorry, game error.';
  }
}
