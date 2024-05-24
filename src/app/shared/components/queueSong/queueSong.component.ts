import { Component, Input, OnInit } from '@angular/core';
import { Artist, Thumbnail } from '../../../models/DTO/DtoSearch';

@Component({
  selector: 'queueSong',
  standalone: true,
  imports: [],
  templateUrl: './queueSong.component.html',
  styleUrl: './queueSong.component.scss'
})
export class QueueSongComponent implements OnInit {

  @Input() songName : string = 'Sin título'
  @Input() artistName : Artist[] = [{name: 'Sin artista'}]
  @Input() imgCover : Thumbnail[] =  []

  converPosition : number =-1
  actualCover : string = '../../../../assets/img/noSong.png'
  constructor() { }

  ngOnInit() {
    this.getConver();
  }

  getConver(){
    
    
   return this.imgCover[0].url|| '../../../../assets/img/noSong.png';
  }


  getArtistName(){
    return this.artistName.map((artist) => artist.name).join(', ');
  }

}
