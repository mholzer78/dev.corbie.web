import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { CrbIcons } from 'crb-lib-icons';

@Component({
  selector: 'li[navItem]',
  standalone: true,
  imports: [CrbIcons, RouterLink, RouterLinkActive],
  templateUrl: './crb-lib-nav-item.html',
  styleUrl: './crb-lib-nav-item.scss',
})
export class CrbNavItemComponent {
  @Input() page!: any;
  @Input() showText!: boolean;
}
