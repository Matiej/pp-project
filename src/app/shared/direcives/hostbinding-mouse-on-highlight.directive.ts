import {
  Directive,
  ElementRef,
  Host,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHostbindingMouseOnHighlight]',
})
export class HostbindingMouseOnHighlightDirective implements OnInit {
  @Input() defaultColor: string = '';
  @Input() highlightColor: string = '';
  @HostBinding('class.host-binding-mouse-on-highlight')
  applyOnMouseHighlitClass = false;
  @HostBinding('style.backgroundColor') backgroundColor: string = '';
  @HostBinding('style.color') afterActoionFontColor: string = '';

  constructor() {}

  ngOnInit(): void {}

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.applyOnMouseHighlitClass = true;
    if (this.highlightColor) {
      this.backgroundColor = this.highlightColor;
      this.afterActoionFontColor = 'black';
    }
  }

  @HostListener('mouseleave') mouseleave() {
    this.applyOnMouseHighlitClass = false;
    if (this.defaultColor) {
      this.backgroundColor = this.defaultColor;
      this.afterActoionFontColor = 'white';
    }
  }
}
