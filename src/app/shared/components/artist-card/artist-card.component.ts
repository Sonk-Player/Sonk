import { Component, Input, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayerServiceService } from '../../../services/player-service.service';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { DTOsearch } from '../../../models/DTO/DtoSearch';

@Component({
  selector: 'app-artist-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss']
})
export class ArtistCardComponent implements OnInit {

  public playerService = inject(PlayerServiceService)
  public ytService = inject(YtApiServiceService)

  ngOnInit() {
  }

  @Input()
  image?: string;

  @Input()
  artistName?: string;

  @Input()

  radioId? : string ;
  @Input()
  artistId?: string;
  
  @Input()
  song: string[] | undefined = [];

  setErrorCover() {
    document.getElementById(this.radioId+'-cover' )?.setAttribute('src', '../../../../assets/img/noSong.png');

  }


  play() {
    if (this.playerService.actualSong != undefined) {
      if (!this.artistName) return;
      this.ytService.search(this.artistName, 'songs').subscribe((res) => {
        if (!res[0].videoId) return;
        this.song?.push(res[0].videoId);

        this.ytService.getSong(this.song![0]).subscribe((song) => {

          this.ytService.getSuggestions(res[0].title, this.song![0]).subscribe((suggestions) => {
            this.playerService.setSuggestions(suggestions);
          });
          this.playerService.setSong(song);
          this.playerService.playSong();

        })

      })



    }

  }
}
