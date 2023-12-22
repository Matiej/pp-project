import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AlertComponent } from './alert/alert.component';
import { BetterCorrectHighlightDirective } from './direcives/better-correct-highlight.directive';
import { DropdownDirective } from './direcives/dropdown.directive';
import { HostbindingMouseOnHighlightDirective } from './direcives/hostbinding-mouse-on-highlight.directive';
import { MouseOnHighlightDirective } from './direcives/mouse-on-highlight.directive';
import { PlaceholderDirective } from './direcives/placeholder/placeholder.directive';
import { UnlessDirective } from './direcives/unless.directive';

@NgModule({
  declarations: [
    BetterCorrectHighlightDirective,
    MouseOnHighlightDirective,
    HostbindingMouseOnHighlightDirective,
    UnlessDirective,
    DropdownDirective,
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    BetterCorrectHighlightDirective,
    MouseOnHighlightDirective,
    HostbindingMouseOnHighlightDirective,
    UnlessDirective,
    DropdownDirective,
    AlertComponent,
    PlaceholderDirective,
  ],
})
export class SharedModule {}
