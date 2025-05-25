import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    title: 'About Page',
    loadComponent: () => import('./pages/about-page/about-page.component'),
  },
  {
    path: 'contact',
    title: 'Contact Page',
    loadComponent: () => import('./pages/contact-page/contact-page.component'),
  },
  {
    path: 'pokemons',
    title: 'Pokémons Page',
    loadComponent: () => import('./pages/pokemons-page/pokemons-page.component'),
  },
  {
    path: 'pokemons/:id',
    title: 'Pokémon Page',
    loadComponent: () => import('./pages/pokemon-page/pokemon-page.component'),
  },
  {
    path: 'pricing',
    title: 'Pricing Page',
    loadComponent: () => import('./pages/pricing-page/pricing-page.component'),
  },
  {
    path: '**',
    redirectTo: 'about',
  },
];
