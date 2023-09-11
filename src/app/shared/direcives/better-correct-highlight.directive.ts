import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterCorrectHighlight]',
})
export class BetterCorrectHighlightDirective implements OnInit {
  readonly OWN_PARAGRAPH_PARAM: string = 'own_para';
  readonly OWN_HEADER_PARAM: string = 'own_header';
  readonly OWN_HEADER_CSS_NAME: string = 'correct-redner-paragraph';
  readonly OWN_PARAGRAPH_CSS_NAME: string = 'correct-render-header';

  @Input() appBetterCorrectHighlight: string | undefined;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {}

  ngOnInit(): void {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      'background-color',
      'blue'
    );

    this.renderer.addClass(
      this.elRef.nativeElement,
      this.getStyleClass(this.appBetterCorrectHighlight)
    );
  }

  private getStyleClass(param: string | undefined): string {
    switch (param) {
      case this.OWN_PARAGRAPH_PARAM:
        return this.OWN_PARAGRAPH_CSS_NAME;
      case this.OWN_HEADER_PARAM:
        return this.OWN_HEADER_CSS_NAME;
      default:
        return '';
    }
  }
}
