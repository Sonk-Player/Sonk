import { Routes } from '@angular/router';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './auth/guards';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('./routes/welcome-page/welcome-page.component').then(m => m.WelcomePageComponent),
  },
  {
    path: 'player',
    canActivate: [isNotAuthenticatedGuard],
    loadComponent: () => import('./routes/layout/home-player-layout/home-player-layout.component').then(m => m.HomePlayerLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./routes/main-page/main-page.component').then(m => m.MainPageComponent)
      },
      {
        path: 'playlist/:id',
        loadComponent: () => import('./routes/playlist-page/playlist.component').then(m => m.PlaylistComponent)
      },
      {
        path: 'artist/:id',
        loadComponent: () => import('./routes/artist/artist.component').then(m => m.ArtistComponent)
      },
      {
        path: 'search/:name',

        loadComponent: () => import('./routes/search-page/search-page.component').then(m => m.SearchPageComponent)
      },
      {
        path: 'user',

        loadComponent: () => import('./routes/user-page/user-page.component').then(m => m.UserPageComponent)
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
  {
    path: 'login',
    canActivate: [isAuthenticatedGuard],
    loadComponent: () => import('./routes/layout/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./routes/login/login.component').then(m => m.LoginComponent)
      },
    ]
  },
  {
    path: 'registro',
    canActivate: [isAuthenticatedGuard],
    loadComponent: () => import('./routes/layout/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./routes/registro/registro.component').then(m => m.RegistroComponent)
      },
    ]
  },
  {
    path: '**', pathMatch: 'full',
    loadComponent: () => import('./routes/error-page/error-page.component').then(m => m.ErrorPageComponent)
  }
];
