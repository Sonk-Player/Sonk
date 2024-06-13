import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DtoPlaylist, Track } from '../../models/DTO/DtoPlaylist';
import { songsBD } from '../../models/DTO/DtoPlaylistPersonalizadas';
import { PlayerServiceService } from '../../services/player-service.service';
import { UserPlaylistsService } from '../../services/user-playlists.service';
import { YtApiServiceService } from '../../services/ytApi-service.service';
import { convertedTime } from '../../utils/converterTime';
import { getCoverMaxSize, setErrorCover } from '../../utils/covers';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SongBarComponent } from '../../shared/components/song-bar/song-bar.component';

@Component({
  selector: 'app-album-page',
  standalone: true,
  imports: [CommonModule,MatIconModule,SongBarComponent],
  templateUrl: './album-page.component.html',
  styleUrl: './album-page.component.scss'
})
export class AlbumPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private ytService = inject(YtApiServiceService);
  private userPlaylistsService = inject(UserPlaylistsService);
  public playerService = inject(PlayerServiceService)

  public album?: DtoPlaylist
  public track : Track[] = [];
  public coverImg: string = '';


  ngOnInit(): void {

    this.getCoverImg()
    this.activatedRoute.params.subscribe((params: any) => {
     
        this.getAlbumTodo(params.id);
        
    });
  }
  

  getAlbumTodo(albumId: string) {
    this.ytService.getAlbun(albumId).subscribe(data => {

      this.album = data;
     
      this.track = this.album!.tracks;
      
    })
  }

  

  getCoverPlaylists(search: DtoPlaylist) {
    return getCoverMaxSize(search.thumbnails)
  }



  setErrorCover(id: string) {
    setErrorCover('cover');
  }

  //otra forma de hacer el playn de la playlist

  play() {
   

      this.ytService.getSong(this.album?.tracks[0].videoId).subscribe((song) => {
        this.playerService.setSuggestions(this.track);
        this.playerService.listId.update(() => this.album?.id || '')
        this.playerService.setSong(song);
        this.playerService.playSong();
      })
  

  }

  getCoverImg() {
    this.coverImg = localStorage.getItem('playlistImg') || '../../../assets/img/noSong.webp';
  }

  //play para cada cancion de la playlist
  play2(videoId: string | undefined) {
  

      this.ytService.getSong(videoId).subscribe((song) => {
        this.playerService.setSuggestions(this.track);
        this.playerService.listId.update(() => this.album?.id || '')
        this.playerService.setSong(song);
        this.playerService.playSong();
      })
    
  }

  determineisPLaying(videoId: string | undefined) {
    return this.playerService.determineisPLaying(videoId)
  }


  isPlayingPlaylist() {
    return this.playerService.isPlaying(this.album?.id)

  }
  getDuration(duration: string) {
    return convertedTime(duration)
  }

}
