import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import cbConvert from '@corbie.dev/color-convert';
import { TCbCmyk, TCbDefault } from '@corbie.dev/color-convert/dist/modules/Color';

import { SiteBlueprint } from '../SiteBlueprint';
import { Clipboard } from '@libs/clipboard';

import { ColorConvertService } from './color-convert.service';
import { ColorPickerComponent } from './color-picker/color-picker.component';

@Component({
  selector: 'section[colorConvert]',
  standalone: true,
  imports: [CommonModule, FormsModule, Clipboard, ColorPickerComponent],
  providers: [ColorConvertService],
  templateUrl: './color-convert.component.html',
  styleUrls: ['./color-convert.component.scss'],
})
export class ColorConvertComponent extends SiteBlueprint implements OnInit, OnDestroy {
  private readonly colorConvertService = inject(ColorConvertService);
  masterR = signal(0);
  masterG = signal(0);
  masterB = signal(0);
  master = signal([0, 0, 0]);
  names = this.colorConvertService.names;
  codes = this.colorConvertService.codes;

  colorHEX = signal('');
  colorRGB = signal('');
  colorHEXWeb = signal('');
  colorRGBWeb = signal('');
  colorPicker = signal('#37474f');
  colorPickerWeb = signal('#37474f');
  colorCMYK = signal([0, 0, 0, 0]);
  colorHSV = signal([0, 0, 0]);
  colorHSL = signal([0, 0, 0]);
  colorHWB = signal('');

  colorName = signal('default');

  ngOnInit(): void {
    let storage = this.getStorage('color');
    this.updateMaster(storage.master);
    this.master2all();
  }

  ngOnDestroy(): void {
    this.store2storage();
  }

  store2storage() {
    this.setStorage('color', { master: this.master() });
  }

  updateMaster(color?: number[]) {
    if (color) {
      this.masterR.set(color[0]);
      this.masterG.set(color[1]);
      this.masterB.set(color[2]);
    }
    this.master.set([this.masterR(), this.masterG(), this.masterB()]);
  }

  master2all(exception?: string) {
    this.store2storage();
    if (exception !== 'HEX') {
      this.colorHEX.set(cbConvert.rgb.hex(this.master() as TCbDefault));
    }
    if (exception !== 'RGB') {
      this.colorRGB.set(this.master().join(','));
    }
    if (exception !== 'CMYK') {
      this.colorCMYK.set(cbConvert.rgb.cmyk(this.master() as TCbCmyk));
    }
    if (exception !== 'HSV') {
      this.colorHSV.set(cbConvert.rgb.hsv(this.master() as TCbDefault));
    }
    if (exception !== 'HSL') {
      this.colorHSL.set(cbConvert.rgb.hsl(this.master() as TCbDefault));
    }
    if (exception !== 'HWB') {
      let tempColor = cbConvert.rgb.hwb(this.master() as TCbDefault);
      this.colorHWB.set(tempColor[0] + ',' + tempColor[1] + '%,' + tempColor[2] + '%');
    }
    this.colorHEXWeb.set(cbConvert.rgb.hex(this.master2Websafe(this.master()) as TCbDefault));
    this.colorRGBWeb.set(this.master2Websafe(this.master()).join(','));
    this.colorPicker.set('#' + cbConvert.rgb.hex(this.master() as TCbDefault));
    this.colorPickerWeb.set('#' + this.colorHEXWeb());
    if (this.codes.includes(cbConvert.rgb.hex(this.master() as TCbDefault).toLowerCase())) {
      this.colorName.set(cbConvert.rgb.hex(this.master() as TCbDefault).toLowerCase());
    } else {
      this.colorName.set('default');
    }
  }

  master2Websafe(rgbArray: number[]) {
    let websafe: number[] = [];
    rgbArray.forEach((item) => {
      websafe.push(Math.round(item / 51) * 51);
    });
    return websafe;
  }

  clearAll(exception: string) {
    if (exception !== 'HEX') {
      this.colorHEX.set('');
    }
    if (exception !== 'RGB') {
      this.colorRGB.set('');
    }
    if (exception !== 'CMYK') {
      this.colorCMYK.set([0, 0, 0, 0]);
    }
    if (exception !== 'HSV') {
      this.colorHSV.set([0, 0, 0]);
    }
    if (exception !== 'HSL') {
      this.colorHSL.set([0, 0, 0]);
    }
    if (exception !== 'HWB') {
      this.colorHWB.set('');
    }
    this.colorHEXWeb.set('');
    this.colorRGBWeb.set('');
    this.colorPicker.set('#37474f');
    this.colorPickerWeb.set('#37474f');
    this.colorName.set('default');
  }

  changeColorHandler(newColor: string): void;
  changeColorHandler(newColor: string, origin: string): void;
  changeColorHandler(newColor: string, origin?: string) {
    if (origin && newColor) {
      if (origin == 'master') {
        this.updateMaster();
        this.master2all();
      } else if (this.validate(origin, newColor)) {
        this.master2all(origin);
      } else {
        this.clearAll(origin);
      }
    } else {
      newColor = newColor.replace('#', '');
      this.updateMaster(cbConvert.hex.rgb(newColor));
      this.master2all();
    }
  }

  validate(origin: string, newColor: string) {
    switch (origin) {
      case 'HEX': {
        return this.validateHEX(newColor);
      }
      case 'RGB': {
        return this.validateRGB(newColor);
      }
      case 'CMYK': {
        return this.validateCMYK(newColor);
      }
      case 'HWB':
      case 'HSV':
      case 'HSL': {
        let tempStringArray = newColor.replaceAll(/[^0-9.,]/g, '').split(',');
        let tempNumberArray: number[] = [];
        let valid = true;
        tempStringArray.forEach((item, index) => {
          tempNumberArray.push(Number.parseInt(item));
          if (
            item == '' ||
            Number.parseInt(item) < 0 ||
            (index == 0 && Number.parseInt(item) > 360) ||
            (index > 0 && Number.parseInt(item) > 100)
          ) {
            valid = false;
          }
        });
        if (valid) {
          switch (origin) {
            case 'HWB':
              this.updateMaster(cbConvert.hwb.rgb(tempNumberArray as TCbDefault));
              break;
            case 'HSV':
              this.updateMaster(cbConvert.hsv.rgb(tempNumberArray as TCbDefault));
              break;
            case 'HSL':
              this.updateMaster(cbConvert.hsl.rgb(tempNumberArray as TCbDefault));
              break;
          }
          return true;
        }
        break;
      }
    }
    return false;
  }

  validateHEX(newColor: string) {
    let regex = /^[0-9A-F]{6}$/i;
    if (regex.test(newColor)) {
      this.updateMaster(cbConvert.hex.rgb(newColor));
      return true;
    }
    return false;
  }

  validateRGB(newColor: string) {
    let rgbStringArray = newColor.replaceAll(/[^0-9,]/g, '').split(',');
    let rgbNumberArray: number[] = [];
    let valid = true;
    if (rgbStringArray.length >= 3 && rgbStringArray[2] !== '') {
      for (let i = 0; i <= 2; i++) {
        valid = valid && Number.parseInt(rgbStringArray[i]) >= 0 && Number.parseInt(rgbStringArray[i]) <= 255;
        rgbNumberArray[i] = Number.parseInt(rgbStringArray[i]);
      }
      if (valid) {
        this.updateMaster(rgbNumberArray);
        return true;
      }
    }
    return false;
  }

  validateCMYK(newColor: string) {
    let cmykStringArray = newColor.split(',');
    let cmykNumberArray: number[] = [];
    let valid = true;
    cmykStringArray.forEach((item) => {
      cmykNumberArray.push(Number.parseInt(item));
      if (item == '' || Number.parseInt(item) < 0 || Number.parseInt(item) > 100) {
        valid = false;
      }
    });
    if (valid) {
      this.updateMaster(cbConvert.cmyk.rgb(cmykNumberArray as TCbCmyk));
      return true;
    }
    return false;
  }
}
