import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'queueSong',
  standalone: true,
  imports: [],
  templateUrl: './queueSong.component.html',
  styleUrl: './queueSong.component.scss'
})
export class QueueSongComponent implements OnInit {

  @Input() songName : string = 'Sin título'
  @Input() artistName : string = 'Sin artista'
  @Input() imgCover : string = '../../../../assets/img/noSong.png'

  constructor() { }

  ngOnInit() {
  }

}
