import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerComponent } from './shared/components/player/player.component';
import { HomePlayerPageComponent } from './routes/pages/home-player-page/home-player-page.component';
import { SongBoxComponent } from './shared/components/song-box/song-box.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlayerComponent, HomePlayerPageComponent,SongBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public title = '../../assets/extremoduro.jpg';
  public album = 'Extremoduro';
}
