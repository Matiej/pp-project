import { Component } from '@angular/core';
import { Detail } from './detail';

@Component({
  selector: 'app-click-task',
  templateUrl: './click-task.component.html',
  styles: [
    `
      .detailb {
        background-color: #43D3F6;
      }
    `,
  ],
})
export class ClickTaskComponent {
  isDetailsButtonDisabled: boolean = false;
  showDetails: boolean = false;
  secretPassword: string = '';
  details: Detail[] = [];
  private detailCounter: number = 0;

  onClickHideDetails() {
    this.isDetailsButtonDisabled = !this.isDetailsButtonDisabled;
    this.showDetails = false;
  }

  onClickDisplayDetails() {
    this.setSecretPassword();
    this.addDetail();
    this.showDetails = true;
    this.isDetailsButtonDisabled = !this.isDetailsButtonDisabled;
  }
  private addDetail() {
    const counter:number = this.detailCounter+=1
    this.details.push(new Detail(counter, new Date()));
  }

  private setSecretPassword() {
    this.secretPassword = 'Secret Password: tuna_' + Math.random();
  }
}
