import { Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { ColorConverterComponent } from './main/color-converter/color-converter.component';
import { PasswordGeneratorComponent } from './main/password-generator/password-generator.component';
import { PermissionGeneratorComponent } from './main/permission-generator/permission-generator.component';
import { ChangeCaseComponent } from './main/change-case/change-case.component';
import { LoremIpsumComponent } from './main/lorem-ipsum/lorem-ipsum.component';
import { LoremImageComponent } from './main/lorem-image/lorem-image.component';
import { TimeConverterComponent } from './main/time-converter/time-converter.component';
import { AspectRatioComponent } from './main/aspect-ratio/aspect-ratio.component';
import { Http404 } from '@libs/http404';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'corbie.dev' },
  { path: 'color-converter', component: ColorConverterComponent, title: 'Color Converter' },
  {
    path: 'password-generator',
    component: PasswordGeneratorComponent,
    title: 'Password Generator',
  },
  {
    path: 'permission-generator',
    component: PermissionGeneratorComponent,
    title: 'Permission Generator',
  },
  { path: 'change-case', component: ChangeCaseComponent, title: 'Change Case' },
  { path: 'lorem-ipsum', component: LoremIpsumComponent, title: 'Lorem Ipsum' },
  { path: 'lorem-image', component: LoremImageComponent, title: 'Lorem Image' },
  { path: 'time-converter', component: TimeConverterComponent, title: 'Time Converter' },
  { path: 'aspect-ratio', component: AspectRatioComponent, title: 'Aspect Ratio' },
  { path: '**', component: Http404, title: 'HTTP404' },
];
