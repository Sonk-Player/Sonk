import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
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
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserPlaylistsService } from '../../services/user-playlists.service';
import { Playlistpersonalizadas } from '../../models/DTO/DtoPlaylistPersonalizadas';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    RouterModule,
    SongBoxComponent,
    MatSidenavModule,
    GenreCardComponent,
    ButtonComponent,
    AlbumBoxComponent,
    ArtistCardComponent,
    ResultBoxComponent,
    TranslateModule,
    MatIconModule
  ],
  providers: [RouterModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {

  @ViewChild('scrollContainer') scrollContainer: ElementRef = new ElementRef(null);

  private ytService = inject(YtApiServiceService);
  private userPlaylistsService = inject(UserPlaylistsService);

  public moodGenres = new moodGenres();

  public genres = this.moodGenres.genres;

  public artistsMap: DTOsearch[] = [];

  public topPlaylists: DTOsearch[] = [];

  public userPlaylists: Playlistpersonalizadas[] = [];
  public userPlaylistImg: string[] = [];
  public playlistTopSpain: DTOsearch[] = [];
  public playlistTopSpain2: DTOsearch[] = [];

  ngOnInit(): void {
    this.topArtists();
    this.getTopPlaylist();
    this.featuresPlaylist();
    this.featuresPlaylist2();
    this.getUserPlaylists();
    this.getMoodCategorys();
  }

  getTopPlaylist() {
    this.ytService.search('Pon Reggaeton', 'featured_playlists').subscribe((res) => {

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
      this.playlistTopSpain2 = res.slice(0, 6);
    });
  }

  getMoodCategorys() {
    this.ytService.getMoodCategory().subscribe((res) => {
      res.Genres.forEach((genre) => {
        this.genres.find((g) => {
          if (g.name === genre.title) {
            g.params = genre.params;
          }
        })
      })
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

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 200,
      behavior: 'smooth'
    });
  }

  getUserPlaylists() {
    this.userPlaylistsService.getPlaylistsByUser().subscribe((res) => {

      this.userPlaylists = res;
      this.getPlaylistUserImg()
    });

  }

  async getPlaylistUserImg() {
    let imgs: string[] | null = []

    if (imgs != null && imgs.length > 0) {
      this.userPlaylistImg = imgs
      return;
    }

    const promises = this.userPlaylists.map((playlist) =>
      this.userPlaylistsService.getPlaylistSongs(playlist.playlistId).toPromise()
    );

    const results = await Promise.all(promises);

    results.forEach(res => {
      if (res === undefined) return;
      imgs?.push(res[0].img);
    });

    this.userPlaylistImg = imgs || []
  }

}
