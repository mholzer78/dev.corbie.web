import { Component, input, output } from '@angular/core';
import { Icons } from '@libs/icons';

@Component({
  selector: 'app-link-toggle',
  imports: [Icons],
  templateUrl: './link-toggle.html',
  styleUrl: './link-toggle.scss',
  host: {
    role: 'button',
    tabindex: '0',
  },
})
export class LinkToggle {
  ident = input();
  current = input();
  toggle = output();

  toggleLink() {
    this.toggle.emit();
  }
}
