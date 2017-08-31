import { Directive, ElementRef, Input, OnInit, Renderer, Output, EventEmitter, HostListener } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Directive({
  selector: '[appShowTooltip]',
})
export class ShowTooltipDirective implements OnInit {

  private el: HTMLElement;
  resizeEvent$: Subject<MouseEvent> = new Subject<MouseEvent>();
  @Output() willShowToolTip: EventEmitter<any> = new EventEmitter();
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeEvent$.next(event);
  }
  constructor(el: ElementRef, private render: Renderer) {
    this.el = el.nativeElement;
    this.resizeEvent$.debounceTime(100).subscribe(
      (event) => {
        this.getTootipToDisplay();
      }
    );
  }
  ngOnInit() {
    this.getTootipToDisplay();
  }

  getTootipToDisplay() {
    setTimeout(() => {
      if (this.el.offsetHeight < this.el.scrollHeight) {
        this.render.setElementClass(this.el, 'txtEllipse', true);
        this.willShowToolTip.emit({status: false, height: this.el.scrollHeight});
      } else {
        this.willShowToolTip.emit({status: true, height: this.el.scrollHeight});
      }
    });
  }

}
