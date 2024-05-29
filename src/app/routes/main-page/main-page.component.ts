import { Component, OnInit, inject } from '@angular/core';
import { AlbumBoxComponent } from '../../shared/components/album-box/album-box.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { GenreCardComponent } from '../../shared/components/genre-card/genre-card.component';
import { PlayerComponent } from '../../shared/components/player/player.component';
import { SongBoxComponent } from '../../shared/components/song-box/song-box.component';
import { ArtistCardComponent } from '../../shared/components/artist-card/artist-card.component';
import { ResultBoxComponent } from '../../shared/components/result-box/result-box.component';
import { moodGenres } from '../../utils/mood&genres';
import { YtApiServiceService } from '../../services/ytApi-service.service';

import { getCoverArtists, getCoverPlaylists } from '../../utils/covers';
import { DTOsearch } from '../../models/DTO/DtoSearch';

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
    ResultBoxComponent,
  ],
  providers: [RouterModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {

  private ytService = inject(YtApiServiceService);

  public songtitle = '../../../../assets/img/extremoduro.jpg';
  public songalbum = 'Extremoduro';

  public text: string = 'Sin nombre';

  public route: string = '';

  public moodGenres = new moodGenres();

  public genres = this.moodGenres.genres;

  public artistsMap: DTOsearch[] = [];

  public topPlaylists: DTOsearch[] = [];

  public playlistTopSpain: DTOsearch[] = [];

  ngOnInit(): void {
    this.topArtists();
    this.getTopPlaylist();
    this.featuresPlaylist();
  }

  getTopPlaylist() {
    this.ytService.search('Pon Reggaeton', 'featured_playlists' ).subscribe((res) => {

      this.topPlaylists = res;
    });
  }

  topArtists() {
    this.ytService.search('top  mundial ', "artists").subscribe((res) => {
      this.artistsMap = res;
    });
  }

  featuresPlaylist() {
    this.ytService.search('top spain', "featured_playlists").subscribe((res) => {
      this.playlistTopSpain = res;
    });
  }

  getCoverArtists(search: DTOsearch) {
    return getCoverArtists(search.thumbnails)
  }

  getCoverPlaylists(search: DTOsearch) {
    return getCoverPlaylists(search.thumbnails)
  }

  getCoverPlaylistsTopSpain(search: DTOsearch) {
    return getCoverPlaylists(search.thumbnails)
  }
}
