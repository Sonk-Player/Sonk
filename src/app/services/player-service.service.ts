import { computed, Injectable, signal, Signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import ytService from 'youtube-player';
import { DTOsearch } from '../models/DTO/DtoSearch';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { DtoSong } from '../models/DTO/DtoSong';


@Injectable({
  providedIn: 'root'
})
export class PlayerServiceService {

 constructor() {

 }

 actualSong?: Signal<DtoSong | undefined>  = signal(undefined);
 yt : YouTubePlayer | undefined;
 songReady = signal(false);



 async playSong(song?:DtoSong ){
    this.actualSong = computed(() => song);
    const playerElement = document.getElementById('player');
    
    if(this.yt ==undefined){
      this.yt = ytService("player");
    }
    if(playerElement){
      
      this.yt.loadVideoByUrl(`https://www.youtube.com/embed/${song?.videoId}`);

      this.yt.on('ready', () => {
        this.yt?.playVideo();
        this.songReady.update(() => true);
      })

    }
  //   console.log("Cargando")
  //  await this.youtubePlayer.loadVideoByUrl('https://www.youtube.com/watch?v=v08qmr8m_-w')



  }

}
