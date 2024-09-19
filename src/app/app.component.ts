import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navigation></app-navigation>
    <router-outlet />
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'client';
}
