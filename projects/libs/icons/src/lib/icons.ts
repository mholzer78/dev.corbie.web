import { Component, input } from '@angular/core';

@Component({
  selector: 'crb-icon',
  standalone: true,
  imports: [],
  templateUrl: './icons.svg',
  styleUrl: './icons.scss',
})
export class Icons {
  image = input.required();
  width = input.required();
  height = input.required();
}
