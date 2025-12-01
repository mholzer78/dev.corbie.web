import { Component, input } from '@angular/core';

@Component({
  selector: 'crb-icon',
  standalone: true,
  imports: [],
  templateUrl: './crb-lib-icons.svg',
  styleUrl: './crb-lib-icons.scss'
})
export class CrbIcons {
  image = input.required();
  width = input.required();
  height = input.required();
}
