import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AspectRatioService } from './aspect-ratio.service';
import { SiteBlueprint } from '../SiteBlueprint';

type ChangeTo = ['ratio' | 'pixel', 'width' | 'height'];

@Component({
  selector: 'section[aspectRatio]',
  imports: [FormsModule],
  providers: [AspectRatioService],
  templateUrl: './aspect-ratio.component.html',
  styleUrl: './aspect-ratio.component.scss',
})
export class AspectRatioComponent extends SiteBlueprint implements OnInit, OnDestroy {
  private readonly aspectRatioService = inject(AspectRatioService);
  ratioWidth = signal('16');
  ratioHeight = signal('9');
  pixelWidth = signal('1920');
  pixelHeight = signal('1080');
  changeTo = signal<ChangeTo>(['ratio', 'width']);

  commonNames = this.aspectRatioService.names;
  commonRatios = this.aspectRatioService.ratios;

  ratioName = signal('default');

  ngOnInit(): void {
    let storage = this.getStorage('aspectRatio');
    //this.updateMaster(storage.master);
    //this.master2all();
  }

  ngOnDestroy(): void {
    //this.store2storage();
  }
  changeRatioHandler(newValue: string): void;
  changeRatioHandler(newValue: string, origin1: string, origin2: string): void;
  changeRatioHandler(newValue: string, origin1?: string, origin2?: string): void {
    if (!origin1) {
      console.log('dropdown changed', newValue);
      // dropdown
      const ratio = newValue.split(',');
      this.ratioWidth.set(ratio[0]);
      this.ratioHeight.set(ratio[1]);
      if (this.changeTo()[0] === 'ratio') {
        this.changeTo.set(['pixel', 'width']);
      }
    } else if (origin1 + origin2 === this.changeTo().join('')) {
      console.log('changed', this.changeTo());
      this.changeTo.set([
        this.changeTo()[0] === 'ratio' ? 'pixel' : 'ratio',
        this.changeTo()[1] === 'width' ? 'height' : 'width',
      ]);
      console.log(this.changeTo());
    }

    switch (this.changeTo().join('')) {
      case 'ratiowidth':
        this.ratioWidth.set(
          ((Number(this.pixelWidth()) / Number(this.pixelHeight())) * Number(this.ratioHeight()))
            .toFixed(3)
            .replace(/\.?0+$/, ''),
        );
        break;
      case 'ratioheight':
        this.ratioHeight.set(
          ((Number(this.pixelHeight()) / Number(this.pixelWidth())) * Number(this.ratioWidth()))
            .toFixed(3)
            .replace(/\.?0+$/, ''),
        );
        break;
      case 'pixelwidth':
        this.pixelWidth.set(
          (
            (Number(this.pixelHeight()) / Number(this.ratioHeight())) *
            Number(this.ratioWidth())
          ).toFixed(0),
        );
        break;
      case 'pixelheight':
        this.pixelHeight.set(
          (
            (Number(this.pixelWidth()) / Number(this.ratioWidth())) *
            Number(this.ratioHeight())
          ).toFixed(0),
        );
        break;
    }

    if (origin) {
      // TBD - might actually match a commmon ratio, so we should check for that and set the name accordingly
      this.ratioName.set('default');
    }
  }

  toggleChangeToElement(arr: ChangeTo, index: 0 | 1): void {
    if (index === 0) {
      arr[0] = arr[0] === 'ratio' ? 'pixel' : 'ratio';
    } else {
      arr[1] = arr[1] === 'width' ? 'height' : 'width';
    }
  }
}
