import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AspectRatioService } from './aspect-ratio.service';
import { LinkToggle } from './link-toggle/link-toggle';
import { Icons } from '@libs/icons';
import { SiteBlueprint } from '../SiteBlueprint';

type ModeLink = 'ratio/pixels' | 'width/height';

@Component({
  selector: 'section[aspectRatio]',
  imports: [FormsModule, LinkToggle, Icons],
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
  modeLink = signal<ModeLink>('width/height');

  commonNames = this.aspectRatioService.names;
  commonRatios = this.aspectRatioService.ratios;

  ratioName = signal('16,9');
  ratioSimplified = computed(() => this.simplifyRatio());
  ratioDecimal = computed(() =>
    (parseFloat(this.ratioWidth()) / parseFloat(this.ratioHeight())).toFixed(2),
  );
  ratioPercentage = computed(
    () =>
      ((parseFloat(this.ratioWidth()) / parseFloat(this.ratioHeight())) * 100)
        .toFixed(2)
        .replace(/\.?0+$/, '') + '%',
  );

  ngOnInit(): void {
    let storage = this.getStorage('aspectRatio');

    this.ratioWidth.set(storage.ratioWidth || this.ratioWidth());
    this.ratioHeight.set(storage.ratioHeight || this.ratioHeight());
    this.pixelWidth.set(storage.pixelWidth || this.pixelWidth());
    this.pixelHeight.set(storage.pixelHeight || this.pixelHeight());
    this.modeLink.set(storage.modeLink || this.modeLink());
    this.checkRatioForDropdown();
  }

  ngOnDestroy(): void {
    this.store2storage();
  }

  store2storage() {
    this.setStorage('aspectRatio', {
      ratioWidth: this.ratioWidth(),
      ratioHeight: this.ratioHeight(),
      pixelWidth: this.pixelWidth(),
      pixelHeight: this.pixelHeight(),
      modeLink: this.modeLink(),
    });
  }

  changeDropdownHandler(newValue: string): void {
    const ratio = newValue.split(',');
    this.ratioWidth.set(ratio[0]);
    this.ratioHeight.set(ratio[1]);
    this.modeLink.set('ratio/pixels');
    this.updateValues('pixels', 'width');
  }
  changeRatioHandler(group: string, dimension: string): void {
    this.updateValues(group, dimension);
  }

  updateValues(group: string, dimension: string): void {
    this.store2storage();
    const ratioWidthNum = parseFloat(this.ratioWidth());
    const ratioHeightNum = parseFloat(this.ratioHeight());
    const pixelWidthNum = parseFloat(this.pixelWidth());
    const pixelHeightNum = parseFloat(this.pixelHeight());
    if (this.modeLink() === 'width/height') {
      if (group === 'ratio') {
        if (dimension === 'width') {
          this.pixelWidth.set(((pixelHeightNum / ratioHeightNum) * ratioWidthNum).toFixed(0));
        } else {
          this.pixelHeight.set(((pixelWidthNum / ratioWidthNum) * ratioHeightNum).toFixed(0));
        }
      } else {
        if (dimension === 'width') {
          this.ratioWidth.set(
            ((ratioHeightNum * pixelWidthNum) / pixelHeightNum).toFixed(2).replace(/\.?0+$/, ''),
          );
        } else {
          this.ratioHeight.set(
            ((ratioWidthNum * pixelHeightNum) / pixelWidthNum).toFixed(2).replace(/\.?0+$/, ''),
          );
        }
      }
    } else {
      if (group === 'ratio') {
        if (dimension === 'width') {
          this.ratioHeight.set(
            (pixelHeightNum / (pixelWidthNum / ratioWidthNum)).toFixed(2).replace(/\.?0+$/, ''),
          );
        } else {
          this.ratioWidth.set(
            (pixelWidthNum / (pixelHeightNum / ratioHeightNum)).toFixed(2).replace(/\.?0+$/, ''),
          );
        }
      } else {
        if (dimension === 'width') {
          this.pixelHeight.set(((pixelWidthNum / ratioWidthNum) * ratioHeightNum).toFixed(0));
        } else {
          this.pixelWidth.set(((pixelHeightNum / ratioHeightNum) * ratioWidthNum).toFixed(0));
        }
      }
    }

    this.checkRatioForDropdown();
    this.simplifyRatio();
  }

  checkRatioForDropdown(): void {
    const found = this.commonRatios.find(
      (element) =>
        element[0] == parseFloat(this.ratioWidth()) && element[1] == parseFloat(this.ratioHeight()),
    );

    if (found) {
      this.ratioName.set(found[0] + ',' + found[1]);
    } else {
      this.ratioName.set('default');
    }
  }

  simplifyRatio(): string {
    const divider = this.findGCD(parseFloat(this.ratioWidth()), parseFloat(this.ratioHeight()));
    const simpliWidth = parseFloat(this.ratioWidth()) / divider;
    const simpliHeight = parseFloat(this.ratioHeight()) / divider;
    return simpliWidth + ':' + simpliHeight;
  }

  findGCD(a: number, b: number): number {
    return b === 0 ? a : this.findGCD(b, a % b);
  }

  toggleMode(): void {
    this.modeLink.set(this.modeLink() === 'width/height' ? 'ratio/pixels' : 'width/height');
  }

  swapValues(): void {
    const tempRatioWidth = this.ratioWidth();
    const tempRatioHeight = this.ratioHeight();
    const tempPixelWidth = this.pixelWidth();
    const tempPixelHeight = this.pixelHeight();
    this.ratioWidth.set(tempRatioHeight);
    this.ratioHeight.set(tempRatioWidth);
    this.pixelWidth.set(tempPixelHeight);
    this.pixelHeight.set(tempPixelWidth);
    this.checkRatioForDropdown();
  }
}
