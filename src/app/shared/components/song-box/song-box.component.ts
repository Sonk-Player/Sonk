
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
  public song: string | undefined;
  public title: string | undefined;


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
      console.log(playlist);
      this.song = playlist.tracks[0].videoId;
      this.title = playlist.tracks[0].title;

      console.log(this.song);
    })
  }




  play(){

    this.ytService.getSong(this.song).subscribe((song) => {

      this.ytService.getSuggestions(this.title, this.song).subscribe((suggestions) => {
        this.playerService.setSuggestions(suggestions);
      });
      this.playerService.setSong(song);
      this.playerService.playSong();
    })
  }



}
