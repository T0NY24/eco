import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero';
import { MarketplaceComponent } from './components/marketplace/marketplace';

export const routes: Routes = [
  {
    path: '',
    component: HeroComponent,
    title: 'EcoIntercambio - Inicio'
  },
  {
    path: 'marketplace',
    component: MarketplaceComponent,
    title: 'Marketplace - EcoIntercambio'
  },
  {
    path: 'marketplace/:category',
    component: MarketplaceComponent,
    title: 'Marketplace - EcoIntercambio'
  },
  {
    path: '**',
    redirectTo: ''
  }
];