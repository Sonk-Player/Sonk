import { Component, Input, OnInit, inject } from '@angular/core';
import { PlayerServiceService } from '../../../services/player-service.service';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { Track } from '../../../models/DTO/DtoPlaylist';

@Component({
  selector: 'app-album-box',
  standalone: true,
  imports: [],
  templateUrl: './album-box.component.html',
  styleUrls: ['./album-box.component.scss']
})
export class AlbumBoxComponent implements OnInit {

  public playerService = inject(PlayerServiceService)
  public ytService = inject(YtApiServiceService)

  public traks: Track[] = [];


  ngOnInit() {
   
  }

  @Input()
  caratulaAlbum?: string;
  @Input()
  nombreAlbum?: string;
  @Input()
  browsedId?: string;

  getPlaylist(){
    this.ytService.getPlaylist(this.browsedId).subscribe((playlist: any) => {
      this.traks = playlist.tracks;
    })
  }

  play(){
    this.getPlaylist();
    this.ytService.getSong(this.traks[0].videoId).subscribe((song) => {
      this.playerService.setSuggestions(this.traks);
      this.playerService.setSong(song);
      this.playerService.playSong();
    })
  }

  setErrorCover() {
    document.getElementById(this.browsedId+'-cover' )?.setAttribute('src', '../../../../assets/img/noSong.webp');

  }
}
