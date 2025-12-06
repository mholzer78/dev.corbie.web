import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from '@libs/nav';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Nav, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '[class.darkMode]': 'darkmode()',
  },
})
export class App implements OnInit {
  test = 'darkMode';
  routes = routes;
  darkmode = signal(true);
  ngOnInit() {
    console.debug('Hello Corbie API');
  }

  changeDesign(value: boolean) {
    this.darkmode.set(value);
  }
}
