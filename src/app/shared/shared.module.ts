import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetterCorrectHighlightDirective } from './direcives/better-correct-highlight.directive';
import { MouseOnHighlightDirective } from './direcives/mouse-on-highlight.directive';

@NgModule({
  declarations: [BetterCorrectHighlightDirective, MouseOnHighlightDirective],
  imports: [CommonModule],
  exports: [BetterCorrectHighlightDirective, MouseOnHighlightDirective],
})
export class SharedModule {}
