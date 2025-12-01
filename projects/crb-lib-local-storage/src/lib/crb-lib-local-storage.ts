import { Injectable } from '@angular/core';

interface Storage {
  main: object;
  color: any;
  password: object;
  permission: object;
  changeCase: object;
  loremIpsum: object;
  loremImage: object;
}

@Injectable({
  providedIn: 'root',
})
export class CrbLocalStorage {
  private storage: Storage = {
    main: { showText: true, darkMode: true},
    color: { master: [255, 216, 1]},
    password: {
      length: 16,
      chars: [true, true, true, false, false], // the fifth is a dummy to manage the regenerate
    },
    permission: { bool: [true, true, false, true, true, false, true, false, false] },
    changeCase: { text: '', choice: 'keep' },
    loremIpsum: { length: 2, choice: 'paragraphs' },
    loremImage: { color: '#ffd801', width: 400, height: 200 },
  };
  
  constructor() {
    let browserStorage = localStorage.getItem('corbie') ?? null;
    if (browserStorage) {
      this.storage = {...this.storage, ...JSON.parse(browserStorage)};
    }
  }

  getProp(
    key:
      | ''
      | 'main'
      | 'color'
      | 'password'
      | 'permission'
      | 'changeCase'
      | 'loremIpsum'
      | 'loremImage'
  ) {
    if (key) {
      return this.storage[key];
    } else {
      return this.storage;
    }
  }

  setProp(
    key:
      'main'
      | 'color'
      | 'password'
      | 'permission'
      | 'changeCase'
      | 'loremIpsum'
      | 'loremImage',
    value: object
  ) {
    let tempStorage = { ...this.storage };
    tempStorage[key] = value;
    this.storage = tempStorage;
    localStorage.setItem('corbie', JSON.stringify(tempStorage))
  }
}