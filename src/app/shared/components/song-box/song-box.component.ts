
import { Component, inject, Input, OnInit } from '@angular/core';
import { PlayerServiceService } from '../../../services/player-service.service';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { DTOsearch } from '../../../models/DTO/DtoSearch';


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
  // @Input() song : DTOsearch | undefined;


  @Input()
  caratulaAlbum?: string;
  @Input()
  nombreAlbum?: string;
  @Input()
  browsedId?: string;
  @Input()
  playlistid1?: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.playlistid1);
    this.getPlaylist();

  }
  
  setErrorCover() {
    document.getElementById(this.browsedId+'-cover')?.setAttribute('src', '../../../../assets/img/noSong.webp');
  }

  getPlaylist(){
    this.ytService.getPlaylist(this.playlistid1).subscribe((playlist) => {
      console.log(playlist);
    })
  }

  play(playlistid: string | undefined) {
    if(playlistid!= undefined){
      this.ytService.getSong(playlistid).subscribe((song) => {
        console.log(song);
        this.playerService.setSong(song);
        this.playerService.playSong();
      })
    }
  }



}
