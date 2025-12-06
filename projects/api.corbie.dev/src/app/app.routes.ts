import { Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { LoremImageComponent } from './main/lorem-image/lorem-image.component';
import { Http404 } from '@libs/http404';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'api.corbie.dev' },
  { path: 'docs/lorem-image', component: LoremImageComponent, title:'Lorem Image' },
  { path: '**', component: Http404, title:'HTTP404' },
];