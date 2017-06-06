import { Component, Renderer } from '@angular/core';

import { range } from 'rxjs/observable/range';
import 'rxjs/add/operator/toArray';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public range = range;

  private _menuOpen = false;

  constructor(private _renderer: Renderer) { }

  toggleMenu() {
    this._menuOpen = !this._menuOpen;
    this._renderer.setElementClass(document.body, 'menu-open', this._menuOpen);
  }
}
