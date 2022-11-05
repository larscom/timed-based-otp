import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <div class="router-outlet">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .router-outlet {
        overflow: auto;
        height: 100%;
        max-width: 980px;
        margin-left: auto;
        margin-right: auto;
        padding: 20px;
      }
    `
  ]
})
export class AppComponent {}
