import { Component } from '@angular/core';
import { SiteBlueprint } from '../SiteBlueprint';

@Component({
  selector: 'section[HTTP404]',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent extends SiteBlueprint {}
