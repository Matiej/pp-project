import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BetterCorrectHighlightDirective } from './direcives/better-correct-highlight.directive';
import { DropdownDirective } from './direcives/dropdown.directive';
import { HostbindingMouseOnHighlightDirective } from './direcives/hostbinding-mouse-on-highlight.directive';
import { MouseOnHighlightDirective } from './direcives/mouse-on-highlight.directive';
import { UnlessDirective } from './direcives/unless.directive';

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
