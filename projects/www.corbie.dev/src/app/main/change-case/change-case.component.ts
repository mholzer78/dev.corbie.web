import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SiteBlueprint } from '../SiteBlueprint';
import { Clipboard } from '@libs/clipboard';

@Component({
  selector: 'section[changeCase]',
  standalone: true,
  imports: [FormsModule, Clipboard],
  templateUrl: './change-case.component.html',
  styleUrl: './change-case.component.scss',
})
export class ChangeCaseComponent extends SiteBlueprint implements OnInit, OnDestroy {
  textOriginal = '';
  text = signal('');
  option = signal('');

  ngOnInit(): void {
    let storage = this.getStorage('changeCase');
    this.textOriginal = storage.text;
    this.text.set(storage.text);
    this.option.set(storage.choice);
    this.text.set(this.changeText());
  }

  ngOnDestroy(): void {
    this.store2storage();
  }

  store2storage() {
    this.setStorage('changeCase', {
      text: this.textOriginal,
      choice: this.option(),
    });
  }

  onChangeText(event: Event) {
    this.textOriginal = (<HTMLTextAreaElement>event.target).value;
    this.text.set(this.textOriginal);
    this.option.set('keep');
    this.store2storage();
  }
  onChangeOption(event: Event) {
    this.text.set(this.changeText());
    this.store2storage();
  }

  changeText() {
    switch (this.option()) {
      case 'lower':
        return this.text().toLowerCase();
      case 'upper':
        return this.text().toUpperCase();
      case 'capWord': {
        let words = this.text().toLowerCase().split(' ');
        words.forEach((word, index) => {
          words[index] = [...word][0].toUpperCase() + [...word].slice(1).join('');
        });
        return words.join(' ');
      }
      case 'capSentence': {
        let sentences = this.text()
          .toLowerCase()
          .split(/[.,;:!?]/);
        sentences.forEach((sentence, index) => {
          let start = -1;
          for (let i = 0; i < sentence.length; i++) {
            let code = sentence.codePointAt(i) || 0;
            if (
              (code > 47 && code < 58) || // numeric (0-9)
              (code > 64 && code < 91) || // upper alpha (A-Z)
              (code > 96 && code < 123) || // lower alpha (a-z)
              (code > 127 && code < 155) ||
              code == 164 ||
              code == 165 // Umlaute etc.
            ) {
              start = i;
              break;
            }
          }
          if (start >= 0) {
            sentences[index] =
              [...sentence].splice(0, start).join('') +
              [...sentence][start].toUpperCase() +
              [...sentence].slice(start + 1).join('');
          }
        });
        return sentences.join('.');
      }
      default:
        return this.textOriginal;
    }
  }
}
