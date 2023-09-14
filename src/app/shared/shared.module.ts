import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetterCorrectHighlightDirective } from './direcives/better-correct-highlight.directive';
import { MouseOnHighlightDirective } from './direcives/mouse-on-highlight.directive';
import { HostbindingMouseOnHighlightDirective } from './direcives/hostbinding-mouse-on-highlight.directive';
import { UnlessDirective } from './direcives/unless.directive';
import { DropdownDirective } from './direcives/dropdown.directive';

@NgModule({
  declarations: [
    BetterCorrectHighlightDirective,
    MouseOnHighlightDirective,
    HostbindingMouseOnHighlightDirective,
    UnlessDirective,
    DropdownDirective,
  ],
  imports: [CommonModule],
  exports: [
    BetterCorrectHighlightDirective,
    MouseOnHighlightDirective,
    HostbindingMouseOnHighlightDirective,
    UnlessDirective,
    DropdownDirective
  ],
})
export class SharedModule {}
