import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[margin]'
})
export class MarginDirective implements OnInit {

  @Input() orientation: string
  @Input() value: string = '15px'

  constructor(
    private _el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.renderer.setStyle(this._el.nativeElement, `margin${this.orientation ? this.capitalize(this.orientation) : ''}`, this.value)
  }

  private capitalize = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1)
}