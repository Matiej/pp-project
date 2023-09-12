import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appMouseOnHighlight]',
})
export class MouseOnHighlightDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {}

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      'background-color',
      'yellow'
    );
    this.renderer.setStyle(this.elRef.nativeElement, 'color', 'black');
  }

  @HostListener('mouseleave') mouseleave() {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      'background-color',
      'transparent'
    );
    this.renderer.setStyle(this.elRef.nativeElement, 'color', 'red');
  }
}
