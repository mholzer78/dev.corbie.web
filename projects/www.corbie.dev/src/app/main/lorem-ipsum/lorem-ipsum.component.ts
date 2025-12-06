import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SiteBlueprint } from '../SiteBlueprint';
import { Clipboard } from '@libs/clipboard';

const loremText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

@Component({
  selector: 'section[loremIpsum]',
  standalone: true,
  imports: [FormsModule, Clipboard],
  templateUrl: './lorem-ipsum.component.html',
  styleUrl: './lorem-ipsum.component.scss',
})
export class LoremIpsumComponent extends SiteBlueprint implements OnInit, OnDestroy {
  length = signal(0);
  option = signal('');
  text = computed(() => this.changeText());

  ngOnInit(): void {
    let storage = this.getStorage('loremIpsum');
    this.length.set(storage.length);
    this.option.set(storage.choice);
  }

  ngOnDestroy(): void {
    this.store2storage();
  }

  store2storage() {
    this.setStorage('loremIpsum', {
      length: this.length(),
      choice: this.option(),
    });
  }

  onChangeOption(event: Event) {
    this.option.set((event.target as HTMLInputElement).value);
  }

  changeText() {
    this.store2storage();
    let tempText = '';
    let tempArray = [];
    switch (this.option()) {
      case 'letters':
        tempText = loremText;
        while (tempText.length < this.length()) {
          tempText += ' ' + loremText;
        }
        return tempText.substring(0, this.length());
      case 'words':
        tempArray = loremText.split(' ');
        while (tempArray.length < this.length()) {
          tempArray = tempArray.concat(loremText.split(' '));
        }
        tempArray.splice(this.length());
        return tempArray.join(' ');
      default:
        for (let i = 1; i <= this.length(); i++) {
          tempText += loremText;
          if (i !== this.length()) {
            tempText += '\n\n';
          }
        }
        return tempText;
    }
  }
}
