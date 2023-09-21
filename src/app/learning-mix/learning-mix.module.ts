import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { ButtonsBoardComponent } from './buttons-board/buttons-board.component';
import { ControlButtonComponent } from './buttons-board/control-button/control-button.component';
import { ClickTaskComponent } from './click-task/click-task.component';
import { OutstandingTask1Component } from './outstanding-task1/outstanding-task1.component';
import { SuccessAlertComponent } from './outstanding-task1/success-alert/success-alert.component';
import { WarningAlertComponent } from './outstanding-task1/warning-alert/warning-alert.component';
import { EvenComponent } from './section5-task/even/even.component';
import { GameControlComponent } from './section5-task/game-control/game-control.component';
import { OddComponent } from './section5-task/odd/odd.component';
import { Section5TaskComponent } from './section5-task/section5-task.component';
import { BasicHighlightDirective } from './section7-directives/basic-highlight.directive';
import { Section7DirectivesComponent } from './section7-directives/section7-directives.component';
import { ActiveUserComponent } from './section9-task-user/active-user/active-user.component';
import { InactiveUserComponent } from './section9-task-user/inactive-user/inactive-user.component';
import { Section9TaskUserComponent } from './section9-task-user/section9-task-user.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { SpinnerTestComponent } from './spinner-test/spinner-test.component';
import { UserTaskComponent } from './user-task/user-task.component';

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
    BasicHighlightDirective,
    Section9TaskUserComponent,
    ActiveUserComponent,
    InactiveUserComponent,
    OutstandingTask1Component,
    WarningAlertComponent,
    SuccessAlertComponent,
  ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule, SharedModule],
  exports: [
    ServersComponent,
    UserTaskComponent,
    ClickTaskComponent,
    Section5TaskComponent,
    SpinnerTestComponent,
    ButtonsBoardComponent,
    ControlButtonComponent,
    Section7DirectivesComponent,
    BasicHighlightDirective,
    Section9TaskUserComponent, OutstandingTask1Component
  ],
  providers: [],
})
export class LearningMixModule {}
