import { NgModule } from '@angular/core';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserTaskComponent } from './user-task/user-task.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ClickTaskComponent } from './click-task/click-task.component';
import { Section5TaskComponent } from './section5-task/section5-task.component';
import { GameControlComponent } from './section5-task/game-control/game-control.component';
import { OddComponent } from './section5-task/odd/odd.component';
import { EvenComponent } from './section5-task/even/even.component';
import { SpinnerTestComponent } from './spinner-test/spinner-test.component';
import { ButtonsBoardComponent } from './buttons-board/buttons-board.component';
import { ControlButtonComponent } from './buttons-board/control-button/control-button.component';
import { Section7DirectivesComponent } from './section7-directives/section7-directives.component';
import { BasicHighlightDirective } from './section7-directives/basic-highlight.directive';

@NgModule({
  declarations: [
    ServerComponent,
    ServersComponent,
    UserTaskComponent,
    ClickTaskComponent,
    Section5TaskComponent,
    GameControlComponent,
    OddComponent,
    EvenComponent,
    SpinnerTestComponent,
    ButtonsBoardComponent,
    ControlButtonComponent,
    Section7DirectivesComponent,
    BasicHighlightDirective
  ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule],
  exports: [
    ServersComponent,
    UserTaskComponent,
    ClickTaskComponent,
    Section5TaskComponent,
    SpinnerTestComponent,
    ButtonsBoardComponent,
    ControlButtonComponent,
    Section7DirectivesComponent, 
    BasicHighlightDirective
  ],
  providers: [],
})
export class LearningMixModule {}
