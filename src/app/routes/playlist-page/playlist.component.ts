import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { YtApiServiceService } from '../../services/ytApi-service.service';
import { DtoPlaylist, Track } from '../../models/DTO/DtoPlaylist';
import { getCoverMaxSize, setErrorCover } from '../../utils/covers';
import { DTOsearch } from '../../models/DTO/DtoSearch';
import { ActivatedRoute } from '@angular/router';
import { PlayerServiceService } from '../../services/player-service.service';
import { SongBarComponent } from '../../shared/components/song-bar/song-bar.component';
import { CommonModule } from '@angular/common';
import { UserPlaylistsService } from '../../services/user-playlists.service';
import { Playlistpersonalizadas, songsBD } from '../../models/DTO/DtoPlaylistPersonalizadas';
import { TypeObject } from '../../models/types/typeObjects';
import { convertedTime } from '../../utils/converterTime';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [MatIconModule, SongBarComponent, CommonModule],
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {

  private activatedRoute = inject(ActivatedRoute);
  private ytService = inject(YtApiServiceService);
  private userPlaylistsService = inject(UserPlaylistsService);
  public playerService = inject(PlayerServiceService)

  public platylist?: DtoPlaylist
  public playlistUser?: Playlistpersonalizadas
  public nombre: string = '';
  public track: Track[] = [];
  public coverImg: string = '';
  public userSongsList: songsBD[] = [];
  public type = signal<string>('')

  ngOnInit(): void {
    this.getCoverImg()
    this.activatedRoute.params.subscribe((params: any) => {
      if (params.type === 'sonk') {
        this.type.update(() => 'sonk');
        this.getPlaylistTodo(params.id);
      } else {
        this.type.update(() => 'user');
        this.getUserPlaylists(params.id);
      }
    });
  }

  getPlaylistTodo(playlistid: string) {
    this.ytService.getPlaylist(playlistid).subscribe(data => {
      this.platylist = data;
      this.track = this.platylist!.tracks;
      this.getCambiarAutor(this.platylist!.author.name)
    })
  }

  getUserPlaylists(playlistid: string) {
    this.playlistUser = JSON.parse(localStorage.getItem('playlist') || '{}');

    if (this.playlistUser?.playlistId === undefined) return;

    this.userPlaylistsService.getPlaylistSongs(playlistid).subscribe(data => {
      this.userSongsList = data;

    });
  }

  getCoverPlaylists(search: DtoPlaylist) {
    return getCoverMaxSize(search.thumbnails)
  }

  getCambiarAutor(author: string) {
    if (author === "YouTube Music") {
      this.nombre = "Sonk"
    } else {
      this.nombre = author
    }
  }

  setErrorCover(id: string) {
    setErrorCover('cover');
  }

  //otra forma de hacer el playn de la playlist

  play() {
    if(this.type() == "sonk"){

      this.ytService.getSong(this.platylist?.tracks[0].videoId).subscribe((song) => {
        this.playerService.setSuggestions(this.track);
        this.playerService.listId.update(() => this.platylist?.id || '')
        this.playerService.setSong(song);
        this.playerService.playSong();
      })
    }else if(this.type() == "user"){
      this.playerService.setSuggestions(this.userSongsList);
      this.playerService.listId.update(() => this.platylist?.id || '')
        this.playerService.setSong(this.userSongsList[0]);
        this.playerService.playSong();
    }

  }

  getCoverImg() {
    this.coverImg = localStorage.getItem('playlistImg') || '../../../assets/img/noSong.webp';
  }

  //play para cada cancion de la playlist
  play2(videoId: string | undefined) {
    if(this.type() == "sonk"){

      this.ytService.getSong(videoId).subscribe((song) => {
        this.playerService.setSuggestions(this.track);
        this.playerService.listId.update(() => this.platylist?.id || '')
        this.playerService.setSong(song);
        this.playerService.playSong();
      })
    }else if(this.type() == "user"){
      this.playerService.setSuggestions(this.userSongsList);
      this.playerService.listId.update(() => this.platylist?.id || '')
      let song = this.userSongsList.find((song) => song.videoId === videoId)

        this.playerService.setSong(song as songsBD);
        this.playerService.playSong();
    }
  }

  determineisPLaying(videoId: string | undefined) {
    return this.playerService.determineisPLaying(videoId)
  }


  isPlayingPlaylist() {
    return this.playerService.isPlaying(this.platylist?.id)

  }
  getDuration(duration: string) {
    return convertedTime(duration)
  }


}
