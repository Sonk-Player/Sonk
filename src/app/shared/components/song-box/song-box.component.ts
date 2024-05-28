
import { Component, inject, Input, OnInit } from '@angular/core';
import { PlayerServiceService } from '../../../services/player-service.service';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { DTOsearch } from '../../../models/DTO/DtoSearch';
import { Track } from '../../../models/DTO/DtoPlaylist';


@Component({
  selector: 'app-song-box',
  standalone: true,
  imports: [],
  templateUrl: './song-box.component.html',
  styleUrl: './song-box.component.scss'
})

export class SongBoxComponent implements OnInit{

  public playerService = inject(PlayerServiceService)
  public ytService = inject(YtApiServiceService)

  public traks: Track[] = [];


  @Input()
  caratulaAlbum?: string;
  @Input()
  nombreAlbum?: string;
  @Input()
  browsedId?: string;


  constructor() { }

  ngOnInit(): void {
    this.getPlaylist();
  }

  setErrorCover() {
    document.getElementById(this.browsedId+'-cover')?.setAttribute('src', '../../../../assets/img/noSong.webp');
  }

  getPlaylist(){
    this.ytService.getPlaylist(this.browsedId).subscribe((playlist: any) => {
      this.traks = playlist.tracks;
    })
  }




  play(){

    this.ytService.getSong(this.traks[0].videoId).subscribe((song) => {


      this.playerService.setSuggestions(this.traks);
      this.playerService.setSong(song);
      this.playerService.playSong();
    })
  }



}
