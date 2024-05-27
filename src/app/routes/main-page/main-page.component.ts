import { Component } from '@angular/core';
import { AlbumBoxComponent } from '../../shared/components/album-box/album-box.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { GenreCardComponent } from '../../shared/components/genre-card/genre-card.component';
import { PlayerComponent } from '../../shared/components/player/player.component';
import { SongBoxComponent } from '../../shared/components/song-box/song-box.component';
import { ArtistCardComponent } from '../../shared/components/artist-card/artist-card.component';
import { ResultBoxComponent } from '../../shared/components/result-box/result-box.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    PlayerComponent,
    RouterModule,
    SongBoxComponent,
    MatSidenavModule,
    GenreCardComponent,
    ButtonComponent,
    AlbumBoxComponent,
    ArtistCardComponent,
    ResultBoxComponent
  ],
  providers: [RouterModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  public songtitle = '../../../../assets/img/extremoduro.jpg';
  public songalbum = 'Extremoduro';

  public albumtitle = '../../../../assets/img/extremoduro.jpg';
  public albumalbum = 'Extremoduro';

  public image =
    'https://www.musicinminnesota.com/wp-content/uploads/2022/08/Jordana_MIM-12.jpg';
  public icon = 'https://www.svgrepo.com/show/9441/guitar.svg';
  public genre = 'Rock';

  public text: string = 'Sin nombre';

  public route: string = '';
}
