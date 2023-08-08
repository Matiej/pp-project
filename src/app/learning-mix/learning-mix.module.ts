import { NgModule } from '@angular/core';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserTaskComponent } from './user-task/user-task.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ClickTaskComponent } from './click-task/click-task.component';

@NgModule({
  declarations: [ServerComponent, ServersComponent, UserTaskComponent, ClickTaskComponent],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule],
  exports: [ServersComponent, UserTaskComponent, ClickTaskComponent],
  providers: [],
})
export class LearningMixModule {}
