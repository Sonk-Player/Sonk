import { YtApiServiceService } from './ytApi-service.service';
import { computed, Injectable, signal, Signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import ytService from 'youtube-player';
import { DTOsearch } from '../models/DTO/DtoSearch';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { DtoSongConcrete } from '../models/DTO/DtoSongConcrete';
import { DtoSong } from '../models/DTO/DtoSuggestion';

@Injectable({
  providedIn: 'root'
})
export class PlayerServiceService {
 

 constructor(private ytService: YtApiServiceService) {

 }

 actualSong?: Signal<DtoSongConcrete | undefined>  = signal(undefined);
 yt : YouTubePlayer | undefined;
 songReady = signal(false);
 suggestions = signal<DtoSong[]>([]);
 playBackState = signal(false);
 posicionInCola = 0;


 nextSong(){
    if(this.actualSong == undefined){
      return;
    }
   this.ytService.getSong(this.suggestions()[this.posicionInCola].videoId).subscribe((song) => {
    if(this.posicionInCola < this.suggestions().length - 1){
      this.posicionInCola++;
      this.setSong(song);
    }else{
      this.posicionInCola = 0;
      this.setSong(song);
    }
    }
  );;
 }

 previousSong(){

  if(this.actualSong == undefined){
    return;
  }
  this.ytService.getSong(this.suggestions()[this.posicionInCola].videoId).subscribe((song) => {
    if(this.posicionInCola > 0){
      this.posicionInCola--;
      this.setSong(song);
    }else{
      this.posicionInCola = this.suggestions().length - 1;
      this.setSong(song);
    }
    }
  );;
 }


 async playSong(){
   if(this.actualSong == undefined){
      return;
   }
    const playerElement = document.getElementById('player');

    if(this.yt == undefined){
      this.yt = ytService("player");
    }
    if(playerElement){
      console.log(this.actualSong())
      console.log(``)
      const urlEmbedded = this.actualSong()?.urlEmbedded;
      if (urlEmbedded) {
        this.yt.loadVideoByUrl(urlEmbedded);
        this.playBackState.update(() => true);
        this.yt.on('ready', () => {
          this.yt?.playVideo();
          this.songReady.update(() => true);
        });
      }
    }


  //   console.log("Cargando")
  //  await this.youtubePlayer.loadVideoByUrl('https://www.youtube.com/watch?v=v08qmr8m_-w')



  }

  resumeSong(){

    this.yt?.playVideo();
    this.playBackState.update(() => true);
    console.log(this.playBackState())
  }

  pauseSong(){

    this.yt?.pauseVideo();
    this.playBackState.update(() => false);
    console.log(this.playBackState())
  }
  setSong(song: DtoSongConcrete){
    if(this.actualSong == undefined){
      return;
    }
    this.actualSong = computed(() => song);
    this.playSong();
  }
  setSuggestions(res: DtoSong[]) {
    this.suggestions.update(() => res);
  }
}
