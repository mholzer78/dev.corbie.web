import { Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { ColorConvertComponent } from './main/color-convert/color-convert.component';
import { PasswordGeneratorComponent } from './main/password-generator/password-generator.component';
import { PermissionGeneratorComponent } from './main/permission-generator/permission-generator.component';
import { ChangeCaseComponent } from './main/change-case/change-case.component';
import { LoremIpsumComponent } from './main/lorem-ipsum/lorem-ipsum.component';
import { LoremImageComponent } from './main/lorem-image/lorem-image.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'corbie.dev' },
  { path: 'color-convert', component: ColorConvertComponent, title:'Color Convert' },
  { path: 'password-generator', component: PasswordGeneratorComponent, title:'Password Generator' },
  { path: 'permission-generator', component: PermissionGeneratorComponent, title:'Permission Generator' },
  { path: 'change-case', component: ChangeCaseComponent, title:'Change Case' },
  { path: 'lorem-ipsum', component: LoremIpsumComponent, title:'Lorem Ipsum' },
  { path: 'lorem-image', component: LoremImageComponent, title:'Lorem Image' },
  { path: '**', component: PageNotFoundComponent, title:'HTTP404' },
];