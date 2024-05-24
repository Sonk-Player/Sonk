import { Component, computed, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Artist, Thumbnail } from '../../../models/DTO/DtoSearch';
import { PlayerServiceService } from '../../../services/player-service.service';
import { DtoSong } from '../../../models/DTO/DtoSong';
import { DtoSuggestion } from '../../../models/DTO/DtoSuggestion';
import { YtApiServiceService } from '../../../services/ytApi-service.service';

@Component({
  selector: 'queueSong',
  standalone: true,
  imports: [],
  templateUrl: './queueSong.component.html',
  styleUrl: './queueSong.component.scss'
})
export class QueueSongComponent implements OnInit {
  @Input() song : DtoSuggestion | undefined
  @Input() songName : string = 'Sin título'
  @Input() artistName : Artist[] = [{name: 'Sin artista'}]
  @Input() imgCover : Thumbnail[] =  []




  converPosition : number =-1
  actualCover : string = '../../../../assets/img/noSong.png'
  constructor(private playerService: PlayerServiceService, private ytService : YtApiServiceService) { }




  ngOnInit() {
    this.getConver();
  }

  getConver(){
    
    
   return this.imgCover[0].url|| '../../../../assets/img/noSong.png';
  }


  getArtistName(){
    return this.artistName.map((artist) => artist.name).join(', ');
  }

  playSong(){ 
    if(this.song == undefined && this.playerService.actualSong == undefined){
      return;
    }else {
      
      this.ytService.getSong(this.song?.videoId).subscribe((res) => {
        this.playerService.actualSong = computed(() => res);
        this.playerService.suggestions.update(() => []);
        this.playerService.playSong();
        
        this.ytService.getSuggestions(this.song?.title).subscribe((res) => {
          this.playerService.suggestions.update(() => res);
        })
      })
    }

  }



}
