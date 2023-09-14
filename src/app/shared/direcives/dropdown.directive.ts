import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isButtonOpen = false;
  constructor(private elRef: ElementRef) {}

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
      console.log(event.target)
    this.isButtonOpen = this.elRef.nativeElement.contains(event.target) ? !this.isButtonOpen : false;

  }
}
