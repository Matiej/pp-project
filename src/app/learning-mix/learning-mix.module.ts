import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ButtonsBoardComponent } from './buttons-board/buttons-board.component';
import { ControlButtonComponent } from './buttons-board/control-button/control-button.component';
import { ClickTaskComponent } from './click-task/click-task.component';
import { OutstandingTask1Component } from './outstanding-task1/outstanding-task1.component';
import { SuccessAlertComponent } from './outstanding-task1/success-alert/success-alert.component';
import { WarningAlertComponent } from './outstanding-task1/warning-alert/warning-alert.component';
import { NavoSection11Component } from './section11-routing/navo-section11/navo-section11.component';
import { Option1Section11Component } from './section11-routing/option1-section11/option1-section11.component';
import { Option2Section11Component } from './section11-routing/option2-section11/option2-section11.component';
import { Section11RoutingComponent } from './section11-routing/section11-routing.component';
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
    Section11RoutingComponent,
    NavoSection11Component,
    Option1Section11Component,
    Option2Section11Component,
  ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule, SharedModule, AppRoutingModule],
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
    Section9TaskUserComponent, OutstandingTask1Component, Section11RoutingComponent
  ],
  providers: [],
})
export class LearningMixModule {}
