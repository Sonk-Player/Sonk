import { Routes } from '@angular/router';

export const routes: Routes = [

    {path: '', loadComponent: () => import('./routes/main-page/main-page.component').then(m => m.MainPageComponent)},
    {path: 'artist', loadComponent: () => import('./routes/artist/artist.component').then(m => m.ArtistComponent)},
    {path: 'search/:name', loadComponent: () => import('./routes/search-page/search-page.component').then(m => m.SearchPageComponent)},


];
