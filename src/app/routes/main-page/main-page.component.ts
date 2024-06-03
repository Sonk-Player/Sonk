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

import { getCoverMinSize, getCoverMaxSize } from '../../utils/covers';
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


  public moodGenres = new moodGenres();

  public genres = this.moodGenres.genres;

  public artistsMap: DTOsearch[] = [];

  public topPlaylists: DTOsearch[] = [];

  public playlistTopSpain: DTOsearch[] = [];
  public playlistTopSpain2: DTOsearch[] = [];

  ngOnInit(): void {
    this.topArtists();
    this.getTopPlaylist();
    this.featuresPlaylist();
    this.featuresPlaylist2();

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
    this.ytService.search('top', "featured_playlists").subscribe((res) => {
      this.playlistTopSpain = res.slice(0, 6);
    });
  }

  featuresPlaylist2() {
    this.ytService.search('spain', "featured_playlists").subscribe((res) => {
      console.log(res);
      this.playlistTopSpain2 = res.slice(0, 6);
    });
  }

  getCoverArtists(search: DTOsearch) {
    return getCoverMinSize(search.thumbnails)
  }

  getCoverPlaylists(search: DTOsearch) {
    return getCoverMaxSize(search.thumbnails)
  }

  getCoverPlaylistsTopSpain(search: DTOsearch) {
    return getCoverMaxSize(search.thumbnails)
  }

}
