import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-odd',
  templateUrl: './odd.component.html',
  styleUrls: ['./odd.component.css'],
})
export class OddComponent {
  @Input({ alias: 'oddGameNumber', required: true })
  gameNumber?: number;
  @Input({ alias: 'oddTextToShow', required: true })
  textToShow?: string;

  get textToDiplay(): string {
    if (this.gameNumber && this.textToShow) {
      return this.textToShow + ': ' + this.gameNumber + '.';
    }

    return 'Sorry, game error.';
  }
}
