import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrbClipboard } from 'crb-lib-clipboard';
import { CrbIcons } from 'crb-lib-icons';
import { SiteBlueprint } from '../SiteBlueprint';

const characters = [
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'abcdefghijklmnopqrstuvwxyz',
  '0123456789',
  '.:,;!?-_#=+*/&@<>()[]{}',
];

@Component({
  selector: 'section[passwordGenerator]',
  standalone: true,
  imports: [FormsModule, CrbClipboard, CrbIcons],
  templateUrl: './password-generator.component.html',
  styleUrl: './password-generator.component.scss',
})
export class PasswordGeneratorComponent
  extends SiteBlueprint
  implements OnInit, OnDestroy
{
  length = signal(0);
  char = signal(new Array<boolean>(5));
  showClear = false;
  passwordMasked = computed(() => '•'.repeat(this.length()));
  passwordClear = computed(() => this.generateString());

  ngOnInit(): void {
    let storage = this.getStorage('password');
    this.length.set(storage.length);
    this.char.set(storage.chars);
  }

  ngOnDestroy(): void {
    this.store2storage();
  }

  store2storage() {
    this.setStorage('password', { length: this.length(), chars: this.char() });
  }

  changeValue(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    let index = (event.target as HTMLInputElement).dataset['index'];
    let tempChar = this.char();
    tempChar[+index!] = value !== 'true';
    this.char.set([...tempChar]);
  }

  generateString() {
    this.store2storage();
    let threshold = '';
    let result = '';

    this.char().forEach((char, index) => {
      if (char && index !== 4) {
        threshold += characters[index];
      }
    });

    const charactersLength = threshold.length;
    const array = new Uint32Array(this.length());
    globalThis.crypto.getRandomValues(array);
    let lastIndex = -1;
    array.forEach(random => {
      let randomArray = random.toString().split('');
      let index = Number.parseInt(randomArray[randomArray.length - 1]);
      if (index === lastIndex) {
        index = Number.parseInt(randomArray[randomArray.length - 2])
      }
      result += threshold.charAt(Math.floor(index / 10 * charactersLength));
      lastIndex = index;
    });

    return result;
  }

  regenerate() {
    this.char.update((data) => {
      data[4] = !data[4];
      return [...data];
    });
  }
}
