import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'fruit/:name',
    loadComponent: () =>
      import('./components/fruit-detail/fruit-detail.component').then(
        (m) => m.FruitDetailComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
