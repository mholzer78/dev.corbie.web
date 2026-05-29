import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SiteBlueprint } from '../SiteBlueprint';
import { InputRange } from '@libs/inputRange';
import { Clipboard } from '@libs/clipboard';
import { Icons } from '@libs/icons';

interface Slot {
  title: string;
  short: string;
  padding: number;
  seperator: string;
  multiplier: number;
}

@Component({
  selector: 'section[timeConverter]',
  standalone: true,
  imports: [CommonModule, FormsModule, InputRange, Clipboard, Icons],
  templateUrl: './time-converter.component.html',
  styleUrl: './time-converter.component.scss',
})
export class TimeConverterComponent extends SiteBlueprint implements OnInit, OnDestroy {
  range = signal<{ min: number; max: number }>({ min: 1, max: 4 });
  sliderMax = 5;
  inputSlots = signal<number[]>([6, 5, 4, 3, 2, 1]);
  outputSlots = signal<string[]>(['', '', '', '', '', '']);
  outputDate = '';
  outputText = '';

  timeSlots: Slot[] = [
    {
      title: 'Weeks',
      short: 'w',
      padding: 0,
      seperator: 'w ',
      multiplier: 604800000,
    },
    {
      title: 'Days',
      short: 'd',
      padding: 0,
      seperator: 'd ',
      multiplier: 86400000,
    },
    {
      title: 'Hours',
      short: 'h',
      padding: 2,
      seperator: ':',
      multiplier: 3600000,
    },
    {
      title: 'Minutes',
      short: 'm',
      padding: 2,
      seperator: ':',
      multiplier: 60000,
    },
    {
      title: 'Seconds',
      short: 's',
      padding: 2,
      seperator: '-',
      multiplier: 1000,
    },
    {
      title: 'Milliseconds',
      short: 'ms',
      padding: 4,
      seperator: '.',
      multiplier: 1,
    },
  ];

  ngOnInit(): void {
    let storage = this.getStorage('timeconverter');
    this.range.set(storage.range || this.range());
    this.inputSlots.set(storage.inputSlots || this.inputSlots());
    this.changeValue();
  }

  ngOnDestroy(): void {
    this.store2storage();
  }

  store2storage() {
    this.setStorage('timeconverter', { range: this.range(), inputSlots: this.inputSlots() });
  }

  changeMinMax(event: { min: number; max: number }) {
    this.range.set(event);
    this.changeValue();
  }

  changeValue() {
    this.store2storage();

    let ms = 0;

    this.inputSlots().forEach((val, index) => {
      if (val > 9999999) {
        let tempSlots = this.inputSlots();
        tempSlots[index] = 9999999;
        this.inputSlots.set(tempSlots);
        console.log(this.inputSlots());
      }

      ms += val * this.timeSlots[index].multiplier;
    });

    // Output Values
    let tempSlots = this.outputSlots();
    this.timeSlots.forEach((val, index) => {
      let result = 0;
      if (this.isBetween(index)) {
        if (this.isBetween(index + 1)) {
          result = Math.floor(ms / val.multiplier);
          ms -= result * val.multiplier;
        } else {
          result = ms / val.multiplier;
        }
        tempSlots[index] = result > 0 ? result.toString() : '';
      } else {
        tempSlots[index] = '';
      }
    });
    this.outputSlots.set(tempSlots);

    // Output Text
    this.outputText = '';
    this.outputDate = '';
    this.timeSlots.forEach((item, index) => {
      if (this.outputSlots()[index] != '') {
        this.outputText += this.outputSlots()[index] + ' ' + item.title + ' ';
        this.outputDate += this.outputSlots()[index].toString().padStart(item.padding, '0');
        if (this.isBetween(index + 1)) {
          this.outputText += ', ';
          this.outputDate += item.seperator;
        }
      }
    });
  }

  isBetween(index: number): boolean {
    return index >= this.range().min && index <= this.range().max;
  }
}
