import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero';
import { MarketplaceComponent } from './marketplace/marketplace';
import { AuthComponent } from './auth/auth';
import { CommunityComponent } from './community/community';
import { PerfilComponent } from './perfil/perfil';
import { ComentariosComponent } from './comentarios/comentarios';
import { IntercambioComponent } from './intercambio/intercambio';
import { OfertasComponent } from './ofertas/ofertas';


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
    path: 'auth',
    component: AuthComponent,
    title: 'Registro - EcoIntercambio'
  },
  {
    path: 'comunidad',
    component: CommunityComponent,
    title: 'Comunidad - EcoIntercambio'
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    title: 'Perfil - EcoIntercambio'
  },
  {
  path: 'comentarios',
  component: ComentariosComponent,
  title: 'Comentarios - EcoIntercambio'
  },
  { path: 'intercambio/:id', component: IntercambioComponent },
  { path: 'ofertas', component: OfertasComponent },
  {
    path: '**',
    redirectTo: ''
  }
];
