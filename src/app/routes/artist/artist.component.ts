import { Component } from '@angular/core';
import { SongBarComponent } from '../../shared/components/song-bar/song-bar.component';
import { ArtistHeaderComponent } from '../../shared/components/artist-header/artist-header.component';
import { SongBoxComponent } from '../../shared/components/song-box/song-box.component';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [SongBarComponent, ArtistHeaderComponent, SongBoxComponent],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss'
})
export class ArtistComponent {

  public songtitle = '../../../../assets/img/extremoduro.jpg';
  public songalbum = 'Extremoduro';
}
