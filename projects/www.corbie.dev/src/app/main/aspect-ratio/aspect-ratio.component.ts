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

  ratioWidthNum = computed(() => Number.parseFloat(this.ratioWidth()));
  ratioHeightNum = computed(() => Number.parseFloat(this.ratioHeight()));
  pixelWidthNum = computed(() => Number.parseFloat(this.pixelWidth()));
  pixelHeightNum = computed(() => Number.parseFloat(this.pixelHeight()));

  commonNames = this.aspectRatioService.names;
  commonRatios = this.aspectRatioService.ratios;

  ratioName = signal('16,9');
  ratioSimplified = computed(() => this.simplifyRatio());
  ratioDecimal = computed(() =>
    (Number.parseFloat(this.ratioWidth()) / Number.parseFloat(this.ratioHeight())).toFixed(2),
  );
  ratioPercentage = computed(
    () =>
      ((Number.parseFloat(this.ratioWidth()) / Number.parseFloat(this.ratioHeight())) * 100)
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

    if (this.modeLink() === 'width/height') {
      this.updateWidthHeight(group, dimension);
    } else {
      this.updateRatioPixel(group, dimension);
    }

    this.checkRatioForDropdown();
    this.simplifyRatio();
  }

  updateWidthHeight(group: string, dimension: string): void {
    if (group === 'ratio' && dimension === 'width') {
      this.pixelWidth.set(
        this.formatPixel((this.pixelHeightNum() / this.ratioHeightNum()) * this.ratioWidthNum()),
      );
    } else if (group === 'ratio' && dimension === 'height') {
      this.pixelHeight.set(
        this.formatPixel((this.pixelWidthNum() / this.ratioWidthNum()) * this.ratioHeightNum()),
      );
    } else if (group === 'pixels' && dimension === 'width') {
      this.ratioWidth.set(
        this.formatRatio((this.ratioHeightNum() * this.pixelWidthNum()) / this.pixelHeightNum()),
      );
    } else if (group === 'pixels' && dimension === 'height') {
      this.ratioHeight.set(
        this.formatRatio((this.ratioWidthNum() * this.pixelHeightNum()) / this.pixelWidthNum()),
      );
    }
  }

  updateRatioPixel(group: string, dimension: string): void {
    if (group === 'ratio' && dimension === 'width') {
      this.ratioHeight.set(
        this.formatRatio(this.pixelHeightNum() / (this.pixelWidthNum() / this.ratioWidthNum())),
      );
    } else if (group === 'ratio' && dimension === 'height') {
      this.ratioWidth.set(
        this.formatRatio(this.pixelWidthNum() / (this.pixelHeightNum() / this.ratioHeightNum())),
      );
    } else if (group === 'pixels' && dimension === 'width') {
      this.pixelHeight.set(
        this.formatPixel((this.pixelWidthNum() / this.ratioWidthNum()) * this.ratioHeightNum()),
      );
    } else if (group === 'pixels' && dimension === 'height') {
      this.pixelWidth.set(
        this.formatPixel((this.pixelHeightNum() / this.ratioHeightNum()) * this.ratioWidthNum()),
      );
    }
  }

  checkRatioForDropdown(): void {
    const found = this.commonRatios.find(
      (element) =>
        element[0] == Number.parseFloat(this.ratioWidth()) &&
        element[1] == Number.parseFloat(this.ratioHeight()),
    );

    if (found) {
      this.ratioName.set(found[0] + ',' + found[1]);
    } else {
      this.ratioName.set('default');
    }
  }

  simplifyRatio(): string {
    const divider = this.findGCD(
      Number.parseFloat(this.ratioWidth()),
      Number.parseFloat(this.ratioHeight()),
    );
    const simpliWidth = Number.parseFloat(this.ratioWidth()) / divider;
    const simpliHeight = Number.parseFloat(this.ratioHeight()) / divider;
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

  formatRatio = (n: number) => n.toFixed(2).replace(/\.?0+$/, '');
  formatPixel = (n: number) => n.toFixed(0);
}
