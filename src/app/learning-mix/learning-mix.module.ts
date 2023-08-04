import { NgModule } from '@angular/core';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserTaskComponent } from './user-task/user-task.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [ServerComponent, ServersComponent, UserTaskComponent],
  imports: [FormsModule, BrowserModule],
  exports: [ServersComponent, UserTaskComponent],
  providers: [],
})
export class LearningMixModule {}
