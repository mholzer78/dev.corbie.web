import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'crb-clipboard',
  standalone: true,
  imports: [],
  templateUrl: './crb-lib-clipboard.html',
  styleUrl: './crb-lib-clipboard.scss',
})
export class CrbClipboard {
  title = input.required<string>();
  value = input.required<string>();
  success = signal(false);
  failure = signal(false);

  copyToClipboard() {
    let inputEl = document.getElementById('clipboardInput') as HTMLTextAreaElement;

    inputEl.value = this.value();
    inputEl.select();
    inputEl.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(inputEl.value);
    inputEl.value = '';

    this.success.set(true);
    setTimeout(() => {
      this.success.set(false);
    }, 2500);
  }
}
