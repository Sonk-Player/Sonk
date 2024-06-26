
import { Component, inject, Input, OnInit } from '@angular/core';
import { PlayerServiceService } from '../../../services/player-service.service';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { DTOsearch } from '../../../models/DTO/DtoSearch';
import { DtoPlaylist, Track } from '../../../models/DTO/DtoPlaylist';
import { Router, RouterModule } from '@angular/router';
import { Thumbnail } from '../../../models/interfaces/thumails';
import { getCoverMaxSize } from '../../../utils/covers';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Playlistpersonalizadas } from '../../../models/DTO/DtoPlaylistPersonalizadas';



@Component({
  selector: 'app-song-box',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './song-box.component.html',
  styleUrl: './song-box.component.scss'
})

export class SongBoxComponent implements OnInit {

  public playerService = inject(PlayerServiceService)
  public ytService = inject(YtApiServiceService)
  private router = inject(Router)

  public track: Track[] = [];
  public playlist?: DtoPlaylist;

  ngOnInit(): void {
    if (this.browsedId === undefined) return;
    if (this.type === 'playlist') this.getPlaylistTodo(this.browsedId);
    if (this.type === 'album') this.getAlbums();


  }

  @Input()
  playlistUser?: Playlistpersonalizadas;

  @Input()
  thumbnail: Thumbnail[] | undefined;

  @Input()
  img: string | undefined;

  @Input()
  nombreAlbum?: string;

  @Input()
  browsedId?: string;

  @Input({ required: true })
  type!: string;
  

  @Input()
  width?: string;

  @Input()
  height?: string;


  setErrorCover() {
    document.getElementById(this.browsedId + '-cover')?.setAttribute('src', '../../../../assets/img/noSong.webp');
  }

  getCover() {
    if (this.img !== undefined) return this.img;
    return getCoverMaxSize(this.thumbnail || []);
  }

  goTo() {
    if (this.type === 'playlist') {
      this.savePlaylistImg()
      this.router.navigate(['/player/playlist/sonk/', this.browsedId])
    }
    if (this.type === 'playlistUser') {
      this.savePlaylistImg()
      this.savePlaylist()
      this.router.navigate(['/player/playlist/user/', this.browsedId])
    }
    if (this.type === 'album') {
      this.savePlaylistImg()
     
      this.router.navigate(['/player/album/', this.browsedId])
    }
  }
  savePlaylistImg() {
    return localStorage.setItem('playlistImg', this.getCover())
  }

  savePlaylist(){
    if (this.playlistUser === undefined) return;
    return localStorage.setItem('playlist', JSON.stringify(this.playlistUser))
  }

  getPlaylistTodo(playlistid: string) {
    this.ytService.getPlaylist(playlistid).subscribe(data => {
      this.playlist = data;
      this.track = this.playlist.tracks;
    })
  }
  getAlbums() {
    this.ytService.getAlbun(this.browsedId).subscribe(data => {
    })
  }

  play() {
    if (this.track === undefined) { return }

    this.ytService.getSong(this.track[0].videoId).subscribe((song) => {
      this.playerService.setSuggestions(this.track);
     
      this.playerService.listId.update(() => this.track[0].videoId || '')

      this.playerService.setSong(song);
      this.playerService.playSong();
    })
  };
}





