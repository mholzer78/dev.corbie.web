import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CrbIcons } from 'crb-lib-icons';
import { SiteBlueprint } from '../SiteBlueprint';

const convert = [
  {
    char: 'r',
    number: 400,
  },
  {
    char: 'w',
    number: 200,
  },
  {
    char: 'x',
    number: 100,
  },
  {
    char: 'r',
    number: 40,
  },
  {
    char: 'w',
    number: 20,
  },
  {
    char: 'x',
    number: 10,
  },
  {
    char: 'r',
    number: 4,
  },
  {
    char: 'w',
    number: 2,
  },
  {
    char: 'x',
    number: 1,
  },
];

@Component({
  selector: 'section[permissionGenerator]',
  standalone: true,
  imports: [CrbIcons, FormsModule],
  templateUrl: './permission-generator.component.html',
  styleUrl: './permission-generator.component.scss',
})
export class PermissionGeneratorComponent
  extends SiteBlueprint
  implements OnInit, OnDestroy
{
  permBool = signal(new Array<boolean>(9));
  permChar = signal('');
  permNumber = signal('');

  ngOnInit(): void {
    let storage = this.getStorage('permission');
    this.permBool.set(storage.bool);
    this.changePermChar();
    this.changePermNumber();
  }

  ngOnDestroy(): void {
    this.store2storage();
  }

  store2storage() {
    this.setStorage('permission', { bool: this.permBool() });
  }

  onChangeBool(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    let index = (event.target as HTMLInputElement).dataset['index'];
    let tempArray = this.permBool();
    tempArray[+index!] = value !== 'true';
    this.permBool.set([...tempArray]);
    this.changePermChar();
    this.changePermNumber();
    this.store2storage();
  }

  onChangeNumber(event: string) {
    let value = Number.parseInt(event);
    let tempArray: boolean[] = [];
    convert.forEach((convertItem, index: number) => {
      if (value - convertItem.number >= 0) {
        tempArray[index] = true;
        value -= convertItem.number;
      } else {
        tempArray[index] = false;
      }
    });
    this.permBool.set(tempArray);
    this.changePermChar();
  }

  onChangeChar(event: string) {
    let value = event.split('');
    let tempArray: boolean[] = [];
    while (value.length > 9) {
      value.shift();
    }
    while (value.length < 9) {
      value.unshift('-');
    }
    value.forEach((char, index) => {
      tempArray[index] = char !== '-';
    });
    this.permBool.set(tempArray);
    this.changePermNumber();
  }

  inputCleanup(event: Event) {
    this.changePermChar();
    this.changePermNumber();
  }

  changePermChar() {
    let tempChar: string = '-';
    this.permBool().forEach((item: boolean, index: number) => {
      if (item) {
          tempChar += convert[index].char;
        } else {
          tempChar += '-';
      }
    });
    this.permChar.set(tempChar);
  }

  changePermNumber() {
    let tempNumber: number = 0;
    this.permBool().forEach((item: boolean, index: number) => {
      if (item) {
        tempNumber += convert[index].number;
      }
    });
    let tempString = '000' + tempNumber;
    this.permNumber.set(tempString.substring(tempString.length - 3));
  }
}
