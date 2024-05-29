import { Component, computed, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Artist } from '../../../models/DTO/DtoSearch';
import { PlayerServiceService } from '../../../services/player-service.service';
import { DtoSong } from '../../../models/DTO/DtoSuggestion';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { Track } from '../../../models/DTO/DtoPlaylist';
import { Thumbnail } from '../../../models/thumails';

@Component({
  selector: 'queueSong',
  standalone: true,
  imports: [],
  templateUrl: './queueSong.component.html',
  styleUrl: './queueSong.component.scss'
})
export class QueueSongComponent implements OnInit {
  @Input() song : DtoSong | Track | undefined
  @Input() songName : string = 'Sin título'
  @Input() artistName : Artist[] = [{name: 'Sin artista'}]
  @Input() imgCover : Thumbnail[] =  []

  @ViewChild('img_queue') img_queue : ElementRef | undefined

  converPosition : number =-1
  actualCover : string = '../../../../assets/img/noSong.webp'
  constructor(private playerService: PlayerServiceService, private ytService : YtApiServiceService) { }

  ngOnInit() {
    this.getConver();
  }

  getConver(){
   return this.imgCover[0].url|| '../../../../assets/img/noSong.webp';
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
        this.playerService.playSong();

      })
    }

  }

  setErrorCover(){
      document.getElementById(this.song?.videoId+'-cover')?.setAttribute('src', '../../../../assets/img/noSong.webp');
  }

}
