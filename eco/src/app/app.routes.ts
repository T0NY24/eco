import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero';
import { MarketplaceComponent } from './components/marketplace/marketplace';
import { AuthComponent } from './auth/auth';

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
    path: 'auth',  // <-- Ruta para AuthComponent (Registro/Login)
    component: AuthComponent,
    title: 'Registro - EcoIntercambio'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
