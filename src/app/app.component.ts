import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerComponent } from './shared/components/player/player.component';
import { HomePlayerLayoutComponent } from './routes/layout/home-player-layout/home-player-layout.component'
import { SongBoxComponent } from './shared/components/song-box/song-box.component';
import {  HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { httpInterceptorInterceptor } from './services/interceptors/http-interceptor.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    PlayerComponent,
    HomePlayerLayoutComponent,
    SongBoxComponent,
    NavbarComponent,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


}
