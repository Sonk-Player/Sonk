import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('./routes/welcome-page/welcome-page.component').then(m => m.WelcomePageComponent),
  },
  {
    path: 'player',
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
        path: 'recomendations/:type',
        loadComponent: () => import('./routes/recomendations/recomendations.component').then(m => m.RecomendationsComponent)
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
  {
    path: 'login',
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
    loadComponent: () => import('./routes/layout/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./routes/registro/registro.component').then(m => m.RegistroComponent)
      },


    ]
  },


];
