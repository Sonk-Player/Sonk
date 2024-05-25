import { Component, OnInit } from '@angular/core';
import { convertedTime } from '../../../utils/converterTime';
import { PlayerServiceService } from '../../../services/player-service.service';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { MatIconModule } from '@angular/material/icon';
import { QueueSongComponent } from '../queueSong/queueSong.component';
import { SuggestionListComponent } from '../suggestion-list/suggestion-list.component';

@Component({
  selector: 'app-reproductor-abajo',
  standalone: true,
  imports: [MatIconModule, QueueSongComponent, SuggestionListComponent],
  templateUrl: './reproductor-abajo.component.html',
  styleUrls: ['./reproductor-abajo.component.scss']
})
export class ReproductorAbajoComponent implements OnInit {

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
    this.ytApiService.getSuggestions("Alan Walker").subscribe((res) => {
      console.log(res)
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
  async changeActualTime2(event : Event){
    event.preventDefault();
    let value = (event.target as HTMLInputElement).value;

    this.playerService.yt?.seekTo(Number.parseInt(value), true);
    this.actualTimeInSecond = Number.parseInt(value);
    this.actualTime = convertedTime(value);

  }

}
