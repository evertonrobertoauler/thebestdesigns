import { Directive, Input, AfterViewInit, ElementRef, Renderer, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { from } from 'rxjs/observable/from';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/merge';

@Directive({
  selector: '[appScrollClass]'
})
export class ScrollClassDirective implements AfterViewInit, OnDestroy {

  private _onScroll: Subscription;

  @Input() appScrollClass: { top?: string, bottom?: string, up?: string, down?: string };

  constructor(
    private _el: ElementRef,
    private _renderer: Renderer,
    @Inject(PLATFORM_ID) private _platform
  ) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this._platform)) {
      const onScroll$ =
        from([null])
          .merge(fromEvent(window, 'scroll'))
          .debounceTime(100)
          .scan(scrollY => {
            if (this.appScrollClass.down) {
              this._renderer.setElementClass(this._el.nativeElement, this.appScrollClass.down, window.scrollY > scrollY);
            }

            if (this.appScrollClass.up) {
              this._renderer.setElementClass(this._el.nativeElement, this.appScrollClass.up, window.scrollY <= scrollY);
            }

            if (this.appScrollClass.top) {
              this._renderer.setElementClass(this._el.nativeElement, this.appScrollClass.top, window.scrollY <= 0);
            }

            if (this.appScrollClass.bottom) {
              this._renderer.setElementClass(
                this._el.nativeElement,
                this.appScrollClass.bottom,
                (window.scrollY + window.innerHeight) >= document.body.scrollHeight
              );
            }

            return window.scrollY;

          }, window.scrollY);

      this._onScroll = onScroll$.subscribe();
    }
  }


  ngOnDestroy() {
    if (this._onScroll instanceof Subscription) {
      this._onScroll.unsubscribe();
    }
  }
}
