import { AfterViewChecked, Component, computed, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { QueueSongComponent } from '../queueSong/queueSong.component';
import { PlayerServiceService } from '../../../services/player-service.service';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { HttpClientModule } from '@angular/common/http';
import { convertedTime } from '../../../utils/converterTime';
import { SuggestionListComponent } from '../suggestion-list/suggestion-list.component';

@Component({
  selector: 'playerSide',
  standalone: true,
  imports: [MatIconModule, QueueSongComponent, SuggestionListComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnInit{


  actualTime : string = "0:00";
  actualTimeInSecond : number = 0;
  constructor(public playerService : PlayerServiceService,  private ytApiService: YtApiServiceService) { }

  ngOnInit(): void {
    // this.getSong();
    this.getSuggestions();
    setTimeout(() => {
      this.playSong();
    },1500)
  }


  playSong(){
      this.actualTime = "0:00";
      this.getActualTime();
      this.playerService.playSong();


  }
  pauseSong(){
    this.playerService.pauseSong();
  }

  resumeSong(){
    console.log("Resuming")
    this.playerService.resumeSong();
  }
  // getSong(){
  //   this.ytApiService.getSong().subscribe((res) => {
  //     this.playerService.actualSong = computed(() => res);
  //   })
  // }
  getSuggestions(){
    this.ytApiService.getSuggestions("Alan Walker", 'pIWaVJPl0-c').subscribe((res) => {
      this.playerService.suggestions.update(() => res);
    })
  }

  getTime(){
    if(this.playerService.actualSong == undefined || this.playerService.actualSong() == undefined){
      return "0:00";
    }
    else{
      return convertedTime(this.playerService.actualSong()?.durationSeconds);
    }

  }
  getActualTime(){
    setInterval(async() => {
        this.actualTime = convertedTime(await this.playerService.yt?.getCurrentTime().then(res => {
        this.actualTimeInSecond = res;
        return res.toString();
      } ));

    },1000)
  }
  getCover(){
    if(this.playerService.actualSong == undefined || this.playerService.actualSong() == undefined){
      return "../../../../assets/img/noSong.png"
    }
    let urlMax = ""
    this.playerService.actualSong()?.thumbnails.forEach((thumbnail) => {
      if(thumbnail.width > 200){
        urlMax = thumbnail.url;
      }
    })
    return urlMax;
  }
  setErrorCover(){
    document.getElementById('player_img')?.setAttribute('src', '../../../../assets/img/noSong.png');
  }
  async changeActualTime(event : Event){
    event.preventDefault();
    let value = (event.target as HTMLInputElement).value;

    this.playerService.yt?.seekTo(Number.parseInt(value), true);
    this.actualTimeInSecond = Number.parseInt(value);
    this.actualTime = convertedTime(value);

  }
  nextSong(){
    this.playerService.nextSong();
  }
  previousSong(){
    this.playerService.previousSong();
  }
  activeVideo(){
    this.playerService.activeVideo();
  }
  disableVideo(){
    this.playerService.disableVideo();
  }
}
