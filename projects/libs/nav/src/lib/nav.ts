import { Component, inject, input, OnDestroy, OnInit, output } from '@angular/core';
import { LocalStorage } from '@libs/local-storage';
import { Icons } from '@libs/icons';
import { NavItem } from './nav-item/nav-item';
import { Routes } from '@angular/router';

@Component({
  selector: 'nav[CrbNav]',
  standalone: true,
  imports: [Icons,NavItem],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav implements OnInit, OnDestroy{
  routes = input.required<Routes>();
  pages!: Routes;
  changeDesign = output<boolean>();
  private readonly localStorageService = inject(LocalStorage);

  showText = true;
  darkMode = true;

  ngOnInit(): void {
    this.pages = this.routes().filter((route) => !route.path!.startsWith('**'));
    this.showText = this.localStorageService.getProp('main').showText;
    this.darkMode = this.localStorageService.getProp('main').darkMode;
    this.changeDesign.emit(this.darkMode);
  }

  ngOnDestroy(): void {
    this.store2storage();
  }

  store2storage() {
    this.localStorageService.setProp('main', { showText: this.showText, darkMode: this.darkMode });
  }

  toggleNav(): void {
    this.showText = !this.showText;
    this.store2storage();
  }

  toggleColor(): void {
    this.darkMode = !this.darkMode;
    this.changeDesign.emit(this.darkMode);
    this.store2storage();
  }
}
