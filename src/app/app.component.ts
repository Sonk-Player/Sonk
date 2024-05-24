import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerComponent } from './shared/components/player/player.component';
import { HomePlayerLayoutComponent } from './routes/layout/home-player-layout/home-player-layout.component'
import { SongBoxComponent } from './shared/components/song-box/song-box.component';
import {  HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlayerComponent, HomePlayerLayoutComponent,SongBoxComponent],
  providers: [HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public title = '../../assets/extremoduro.jpg';
  public album = 'Extremoduro';
}
