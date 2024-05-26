import { Component } from '@angular/core';
import { PlayerComponent } from '../../../shared/components/player/player.component';
import { RouterModule } from '@angular/router';
import { SongBoxComponent } from '../../../shared/components/song-box/song-box.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { GenreCardComponent } from '../../../shared/components/genre-card/genre-card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AlbumBoxComponent } from '../../../shared/components/album-box/album-box.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';


@Component({
  selector: 'homePlayerLayout',
  standalone: true,
  imports: [
    PlayerComponent,
    RouterModule,
    SongBoxComponent,
    MatSidenavModule,
    GenreCardComponent,
    ButtonComponent,
    AlbumBoxComponent,
    NavbarComponent],
  templateUrl: './home-player-layout.component.html',
  styleUrl: './home-player-layout.component.scss'
})
export class HomePlayerLayoutComponent {

  public songtitle = '../../../../assets/img/extremoduro.jpg';
  public songalbum = 'Extremoduro';

  public albumtitle = '../../../../assets/img/extremoduro.jpg';
  public albumalbum = 'Extremoduro';

  public image = "https://www.musicinminnesota.com/wp-content/uploads/2022/08/Jordana_MIM-12.jpg";
  public icon = "https://www.svgrepo.com/show/9441/guitar.svg";
  public genre = "Rock";

  public text: string = 'Sin nombre';

  public route: string = '';


}
