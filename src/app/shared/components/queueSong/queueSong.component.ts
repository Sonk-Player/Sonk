import { Component, computed, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Artist } from '../../../models/DTO/DtoSearch';
import { PlayerServiceService } from '../../../services/player-service.service';
import { DtoSong } from '../../../models/DTO/DtoSuggestion';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { Track } from '../../../models/DTO/DtoPlaylist';
import { Thumbnail } from '../../../models/interfaces/thumails';
import { CommonModule } from '@angular/common';
import { songsBD } from '../../../models/DTO/DtoPlaylistPersonalizadas';
import { getCoverMaxSize, getCoverMinSizeByString } from '../../../utils/covers';

@Component({
  selector: 'queueSong',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './queueSong.component.html',
  styleUrl: './queueSong.component.scss'
})
export class QueueSongComponent implements OnInit {
  @Input() song : DtoSong | Track | songsBD |  undefined
  @Input() songName : string = 'Sin título'
  @Input() artistName? : Artist[]
  @Input() artistNameUser? : string
  @Input() imgCover? : Thumbnail[]
  @Input() imgCoverUser? : string
  @Input() index : number = 0
  @ViewChild('img_queue') img_queue : ElementRef | undefined

  converPosition : number =-1
  actualCover : string = '../../../../assets/img/noSong.webp'
  constructor(public playerService: PlayerServiceService, private ytService : YtApiServiceService) { }

  ngOnInit() {
    this.getConver();
  }

  getConver(){

      if(this.imgCover!=undefined){
        return getCoverMaxSize(this.imgCover);
      }else if(this.imgCoverUser!=undefined){
        return getCoverMinSizeByString(this.imgCoverUser);
      }
      return '../../../../assets/img/noSong.webp';
  }


  getArtistName(){
    if(this.artistName != undefined){
      return this.artistName.map((artist) => artist.name).join(', ');;
    }else if(this.artistNameUser != undefined){
      return this.artistNameUser;
    }
    return '';
  }

  playSong(){
    if(this.song == undefined && this.playerService.actualSong == undefined){
      return;
    }else {
      this.playerService.posicionInCola = this.index;
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
