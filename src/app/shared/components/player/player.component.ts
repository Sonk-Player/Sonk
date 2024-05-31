import { AfterViewChecked, Component, computed, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { QueueSongComponent } from '../queueSong/queueSong.component';
import { PlayerServiceService } from '../../../services/player-service.service';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { HttpClientModule } from '@angular/common/http';
import { convertedTime } from '../../../utils/converterTime';
import { SuggestionListComponent } from '../suggestion-list/suggestion-list.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'playerSide',
  standalone: true,
  imports: [MatIconModule, QueueSongComponent,LoadingComponent, SuggestionListComponent, CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnInit {


  actualTime: string = "0:00";
  actualTimeInSecond: number = 0;
  constructor(public playerService: PlayerServiceService, private ytApiService: YtApiServiceService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getActualTime();
      document.getElementById('player')?.classList.add('pointer-events-none')
      this.loadActualSong();
      this.loadSuggestions();
    
    }, 1000);

  }

  loadActualSong() {  

    this.playerService.actualSong= computed(() => this.playerService.getActualSongInLocalStorage());
    setTimeout(() => {
      this.playSong();

    }, 1000);
  }
  loadSuggestions() {
    this.playerService.suggestions.update(() => this.playerService.getSuggestionsInLocalStorage());
  } 
  playSong() {
    this.actualTime = "0:00";
    this.getActualTime();
    this.playerService.playSong();


  }
  pauseSong() {
    this.playerService.pauseSong();
  }

  resumeSong() {
    console.log("Resuming")
    this.playerService.resumeSong();
  }
  // getSong(){
  //   this.ytApiService.getSong().subscribe((res) => {
  //     this.playerService.actualSong = computed(() => res);
  //   })
  // }
  getSuggestions() {
    this.ytApiService.getSuggestions("Alan Walker", 'pIWaVJPl0-c').subscribe((res) => {
      this.playerService.suggestions.update(() => res);
    })
  }

  getTime() {
    if (this.playerService.actualSong == undefined || this.playerService.actualSong() == undefined) {
      return "0:00";
    }
    else {
      return convertedTime(this.playerService.actualSong()?.durationSeconds);
    }

  }
  getActualTime() {
    setInterval(async () => {
      let duration = this.playerService.yt?.getDuration().then(res => {
        return res;
      }
      );
      let actualTimeYt = this.playerService.yt?.getCurrentTime().then(res => {
        this.actualTimeInSecond = res;
        return res;
      }
      );
      if(await actualTimeYt === await duration){
        if (this.playerService.isLoop() == true  ) {

          this.playerService.yt?.seekTo(0, true);
          this.playerService.yt?.playVideo();
  
        }
       
      }
     
      this.actualTime = convertedTime(this.actualTimeInSecond.toString());

    }, 1000)


  }
  getCover() {
    if (this.playerService.actualSong == undefined || this.playerService.actualSong() == undefined) {
      return "../../../../assets/img/noSong.webp"
    }
    let urlMax = ""
    this.playerService.actualSong()?.thumbnails.forEach((thumbnail) => {
      if (thumbnail.width > 200) {
        urlMax = thumbnail.url;
      }
    })
    return urlMax;
  }
  setErrorCover() {
    document.getElementById('player_img')?.setAttribute('src', '../../../../assets/img/noSong.webp');
  }
  setErrorCoverDialog() {
    document.getElementById('dialog_img')?.setAttribute('src', '../../../../assets/img/noSong.webp');
  }
  async changeActualTime(event: Event) {
    event.preventDefault();
    let value = (event.target as HTMLInputElement).value;

    this.playerService.yt?.seekTo(Number.parseInt(value), true);
    this.actualTimeInSecond = Number.parseInt(value);
    this.actualTime = convertedTime(value);

  }
  nextSong() {

    this.playerService.nextSong();
  }
  previousSong() {
    this.playerService.previousSong();
  }
  activeVideo() {
    this.playerService.activeVideo();
  }
  disableVideo() {
    this.playerService.disableVideo();
  }
  activeLoop() {
    this.playerService.activeLoop();
  }
  disableLoop() {
    this.playerService.disableLoop();
  }
  setImageInError() {
    const videoDialog = document.getElementById('video_dialog');
    if (videoDialog) {
      videoDialog.style.backgroundImage = 'url(../../../../assets/img/noSong.webp)';
    }
  }

  
}
