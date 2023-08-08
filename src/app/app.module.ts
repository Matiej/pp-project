import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LearningMixComponent } from './learning-mix/learning-mix.component';
import { LearningMixModule } from './learning-mix/learning-mix.module';
import { ReactiveFormsModule } from '@angular/forms';
 
@NgModule({
  declarations: [
    AppComponent,
    LearningMixComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LearningMixModule,
    FormsModule,
    ReactiveFormsModule
  ],
 
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
