import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner-test',
  templateUrl: './spinner-test.component.html',
  styleUrls: ['./spinner-test.component.css'],
})
export class SpinnerTestComponent {
  message: string = 'Spinder is currectly disabled.';
  spinnerButtonDesc: string = 'Enable';
  isSpinner: boolean = false;

  onSpinnerClick() {
    this.isSpinner = !this.isSpinner;
    this.changeButtonState(this.isSpinner);
  }

  private changeButtonState(isSpinner: boolean) {
    this.spinnerButtonDesc = isSpinner ? 'Disable' : 'Enable';
    this.message = isSpinner ? 'Spinner is curently enabled' : 'Spinner is DISABLED';
  }
}
