import { Component } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  template: `<h4 class = "success-message">This is a wonderful success</h4>`,
  styles: [
    `
      .success-message {
        text-align: center;
        padding: 15px;
        background-color: #29B20A;
        color: white;
        border: 2px solid black;
      }
    `,
  ],
})
export class SuccessAlertComponent {}
