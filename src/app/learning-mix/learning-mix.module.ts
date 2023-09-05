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

@NgModule({
  declarations: [ServerComponent, ServersComponent, UserTaskComponent, ClickTaskComponent, 
    Section5TaskComponent, GameControlComponent, OddComponent, EvenComponent, SpinnerTestComponent],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule],
  exports: [ServersComponent, UserTaskComponent, ClickTaskComponent, Section5TaskComponent, SpinnerTestComponent],
  providers: [],
})
export class LearningMixModule {}
