import { Component, Input, computed, inject } from '@angular/core';
import { DTOsearch } from '../../../models/DTO/DtoSearch';
import { convertedTime } from '../../../utils/converterTime';
import { PlayerServiceService } from '../../../services/player-service.service';
import { YtApiServiceService } from '../../../services/ytApi-service.service';

@Component({
  selector: 'app-song-large',
  standalone: true,
  imports: [],
  templateUrl: './song-large.component.html',
  styleUrl: './song-large.component.scss'
})
export class SongLargeComponent {


  public playerService = inject(PlayerServiceService)
  public ytService = inject(YtApiServiceService)
  @Input() song : DTOsearch | undefined;


  obteinDuration(){
   return convertedTime(this.song?.duration_seconds?.toString());
  }
  getCover(){

    if(this.song==undefined){
      return "../../../../assets/img/noSong.png"
    }
    let urlMax = ""

      this.song?.thumbnails.forEach((thumbnail) => {
      if(thumbnail.width > 200){
        urlMax = thumbnail.url;
      }
    })
    return urlMax;
  }
  setErrorCover() {
    document.getElementById(this.song?.videoId+'-cover')?.setAttribute('src', '../../../../assets/img/noSong.png');
  }


  getArtistName(){
    return this.song?.artists?.map((artist) => artist.name).join(', ');
  }


  play(){
    if(this.playerService.actualSong != undefined){
      this.ytService.getSong(this.song?.videoId).subscribe((song) => {
        this.playerService.setSong(song);
        this.playerService.playSong();
      })

    }


  }
}


