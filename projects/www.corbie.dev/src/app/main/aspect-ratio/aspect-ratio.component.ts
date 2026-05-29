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
    const ratioWidthNum = Number.parseFloat(this.ratioWidth());
    const ratioHeightNum = Number.parseFloat(this.ratioHeight());
    const pixelWidthNum = Number.parseFloat(this.pixelWidth());
    const pixelHeightNum = Number.parseFloat(this.pixelHeight());

    const linkHorizontal = this.modeLink() === 'width/height';

    if (
      (linkHorizontal && group === 'ratio' && dimension === 'width') ||
      (!linkHorizontal && group === 'pixels' && dimension === 'height')
    ) {
      this.pixelWidth.set(this.formatPixel((pixelHeightNum / ratioHeightNum) * ratioWidthNum));
    } else if (
      (linkHorizontal && group === 'ratio' && dimension === 'height') ||
      (!linkHorizontal && group === 'pixels' && dimension === 'width')
    ) {
      this.pixelHeight.set(this.formatPixel((pixelWidthNum / ratioWidthNum) * ratioHeightNum));
    } else if (linkHorizontal && group !== 'ratio' && dimension === 'width') {
      this.ratioWidth.set(this.formatRatio((ratioHeightNum * pixelWidthNum) / pixelHeightNum));
    } else if (linkHorizontal && group !== 'ratio' && dimension === 'height') {
      this.ratioHeight.set(this.formatRatio((ratioWidthNum * pixelHeightNum) / pixelWidthNum));
    } else if (!linkHorizontal && group === 'ratio' && dimension === 'width') {
      this.ratioHeight.set(this.formatRatio(pixelHeightNum / (pixelWidthNum / ratioWidthNum)));
    } else if (!linkHorizontal && group === 'ratio' && dimension === 'height') {
      this.ratioWidth.set(this.formatRatio(pixelWidthNum / (pixelHeightNum / ratioHeightNum)));
    }

    this.checkRatioForDropdown();
    this.simplifyRatio();
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
