import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrbNav } from 'crb-lib-nav';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CrbNav, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '[class.darkMode]': 'darkmode()'
  },
})
export class App implements OnInit {
  test = 'darkMode'
    routes = routes;
  darkmode = signal(true);
  ngOnInit() {console.debug("Hello Corbie")}

  changeDesign(value: boolean) {
    this.darkmode.set(value);
  }
}