import {Component} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  template: `
    <router-outlet></router-outlet>`
})
export class AppComponent {
}
