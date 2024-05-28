import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-artist-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss']
})
export class ArtistCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input()
  image?: string;

  @Input()
  artistName?: string;

  @Input()
  radioId? : string ;


  setErrorCover() {
    document.getElementById(this.radioId+'-cover' )?.setAttribute('src', '../../../../assets/img/noSong.png');
  }
}
