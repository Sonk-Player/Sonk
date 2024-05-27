import { Component, Input } from '@angular/core';
import { DTOsearch } from '../../../models/DTO/DtoSearch';
import { convertedTime } from '../../../utils/converterTime';

@Component({
  selector: 'app-song-large',
  standalone: true,
  imports: [],
  templateUrl: './song-large.component.html',
  styleUrl: './song-large.component.scss'
})
export class SongLargeComponent {

  @Input() song : DTOsearch | undefined;


  obteinDuration(){
   return convertedTime(this.song?.duration);
  }
  getCover(){
    if(this.song==undefined || this.song.thumbnails == undefined || this.song.thumbnails.length == 0){
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
}
