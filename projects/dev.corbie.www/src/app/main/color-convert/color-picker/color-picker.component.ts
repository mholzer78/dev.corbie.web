import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
})
export class ColorPickerComponent {
  color = model<string>('#000000');
  changeColor = output<string>();

  disabled = input();

  updateColor(event: Event) {
    this.changeColor.emit((event.target as HTMLInputElement).value);
  }
}
