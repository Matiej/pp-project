import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonLabelName } from 'src/app/shared/button-name';
import { LearningMixSharedService } from '../../learning-mix-shared.service';

@Component({
  selector: 'app-navo-section11',
  templateUrl: './navo-section11.component.html',
  styleUrls: ['./navo-section11.component.css'],
})
export class NavoSection11Component {
  constructor(
    private router: Router,
    private sharedLearningService: LearningMixSharedService,
    private route: ActivatedRoute
  ) {}

  onOptions1Click() {
    this.sharedLearningService.turnOnSection(ButtonLabelName.SECTION11_ROUTING);
    // this.router.navigate(['learning-mix/sec11/options1']);
    this.router.navigate(['options1'], { relativeTo: this.route });
  }

  onOptions2Click() {
    this.sharedLearningService.turnOnSection(ButtonLabelName.SECTION11_ROUTING);
  }
}
