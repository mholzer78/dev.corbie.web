import { Component, OnDestroy, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SiteBlueprint } from '../SiteBlueprint';
import { CrbIcons } from 'crb-lib-icons';
import cbLoremImage from '@corbie.dev/lorem-image';

@Component({
  selector: 'section[loremImage]',
  standalone: true,
  imports: [FormsModule, CrbIcons],
  templateUrl: './lorem-image.component.html',
  styleUrl: './lorem-image.component.scss',
})
export class LoremImageComponent extends SiteBlueprint implements OnInit, OnDestroy {
  color = signal('#000000');
  colorPicker = signal('#000000');
  width = signal(500);
  height = signal(400);
  svgDataUrl = signal('');
  link = computed(() => {
    return (
      'https://api.corbie.dev/loremimage/' +
      this.width() +
      '/' +
      this.height() +
      '/' +
      this.color().substring(1)
    );
  });

  ngOnInit(): void {
    let storage = this.getStorage('loremImage');
    this.color.set(storage.color);
    this.colorPicker.set(storage.color);
    this.width.set(Number(storage.width));
    this.height.set(Number(storage.height));
    this.updateImage();
  }

  ngOnDestroy(): void {
    this.store2storage();
  }

  store2storage() {
    this.setStorage('loremImage', {
      color: this.color(),
      width: this.width(),
      height: this.height(),
    });
  }

  changeColorHandler(event: Event): void {
    let newColor = (event.target as HTMLInputElement).value;
    let regex = /^#[0-9A-F]{6}$/i;
    if (regex.test(newColor)) {
      this.color.set(newColor);
      this.colorPicker.set((event.target as HTMLInputElement).value);
      this.updateImage();
    }
  }
  updateImage() {
    this.store2storage();
    this.svgDataUrl.set(cbLoremImage.svg(this.width(), this.height(), this.color()));
  }

  hex2rgb(hex: string) {
    let hexInt = Number.parseInt(hex.slice(1), 16);
    let r = (hexInt >> 16) & 255;
    let g = (hexInt >> 8) & 255;
    let b = hexInt & 255;
    return [r, g, b];
  }

  download() {
    const imageEl = document.querySelector('#canvasPreview') as HTMLCanvasElement;
    const linkEl = document.createElement('a');
    linkEl.href = imageEl.toDataURL('image/png');
    linkEl.setAttribute(
      'download',
      this.width().toString() +
        'x' +
        this.height().toString() +
        '_' +
        this.color().slice(1) +
        '_corbie'
    );
    linkEl.click();
  }
}
