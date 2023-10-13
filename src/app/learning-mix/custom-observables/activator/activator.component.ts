import { Component } from '@angular/core';
import { CustomShareService } from '../custom-share.service';

@Component({
  selector: 'app-activator',
  templateUrl: './activator.component.html',
  styleUrls: ['./activator.component.css'],
})
export class ActivatorComponent {
  constructor(private customService: CustomShareService) {}
  onDeactivate() {
    this.customService.changeSubjectActiavtionState(false)
  }
}
