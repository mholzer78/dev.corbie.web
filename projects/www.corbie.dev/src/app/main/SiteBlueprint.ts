import { inject } from '@angular/core';
import { LocalStorage } from '@libs/local-storage';

export abstract class SiteBlueprint {
  private readonly localStorageService = inject(LocalStorage);

  private readonly storageKey:
    | ''
    | 'color'
    | 'password'
    | 'permission'
    | 'changeCase'
    | 'loremIpsum'
    | 'loremImage' = '';

  getStorage(key: typeof this.storageKey) {
    return this.localStorageService.getProp(key);
  }
  setStorage(
    key:
      | 'color'
      | 'password'
      | 'permission'
      | 'changeCase'
      | 'loremIpsum'
      | 'loremImage',
    value: {}
  ): void {
    this.localStorageService.setProp(key, value);
  }
}
