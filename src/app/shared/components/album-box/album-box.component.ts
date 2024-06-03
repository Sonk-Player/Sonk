import { Component, Input, OnInit, inject } from '@angular/core';
import { PlayerServiceService } from '../../../services/player-service.service';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { DtoPlaylist, Track } from '../../../models/DTO/DtoPlaylist';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-box',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './album-box.component.html',
  styleUrls: ['./album-box.component.scss']
})
export class AlbumBoxComponent implements OnInit {

  public playerService = inject(PlayerServiceService)
  public ytService = inject(YtApiServiceService)
  private router = inject(Router)
  // public playlist?: DtoPlaylist;

  public traks: Track[] = [];

  ngOnInit() {
  }

  @Input()
  caratulaAlbum?: string;
  @Input()
  nombreAlbum?: string;
  @Input()
  browsedId?: string;


  getPlaylist() {
    this.ytService.getPlaylist(this.browsedId).subscribe((playlist: any) => {
      this.traks = playlist.tracks;
      this.ytService.getSong(this.traks[0].videoId).subscribe((song) => {
        this.playerService.setSuggestions(this.traks);
        this.playerService.setSong(song);
        this.playerService.playSong();
      })
    })
  }

  goTo(){
    this.router.navigate(['/player/playlist',this.browsedId])
    this.savePlaylistImg();
  }

  play() {
    this.getPlaylist();
  }

  setErrorCover() {
    document.getElementById(this.browsedId + '-cover')?.setAttribute('src', '../../../../assets/img/noSong.webp');
  }


  savePlaylistImg(){
    if(this.caratulaAlbum === undefined) return;
    return localStorage.setItem('playlistImg',this.caratulaAlbum)
  }

}
