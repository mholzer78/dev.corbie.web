import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Icons } from '@libs/icons';

@Component({
  selector: 'li[navItem]',
  standalone: true,
  imports: [Icons, RouterLink, RouterLinkActive],
  templateUrl: './nav-item.html',
  styleUrl: './nav-item.scss',
})
export class NavItem {
  @Input() page!: any;
  @Input() showText!: boolean;
  iconName = '';

  ngOnInit(): void {
    this.iconName = this.page.path.split('/').at(-1);
  }
}
