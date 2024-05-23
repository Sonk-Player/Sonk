import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import YouTubePlayer from 'youtube-player';
import { DTOsearch } from '../models/DTO/DtoSearch';


@Injectable({
  providedIn: 'root'
})
export class PlayerServiceService {

 constructor() {


  
  
 }


 async playSong(song?:DTOsearch ){

   

    const playerElement = document.getElementById('player');
    
    if(playerElement){
      const player  = YouTubePlayer("player");
      

      player.loadVideoById('v08qmr8m_-w');


      player.on('ready', () => {
        player.playVideo();

      })

    }
  //   console.log("Cargando")
  //  await this.youtubePlayer.loadVideoByUrl('https://www.youtube.com/watch?v=v08qmr8m_-w')



  }

}
