import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Artist, DTOsearch } from '../../../models/DTO/DtoSearch';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { PlayerServiceService } from '../../../services/player-service.service';

@Component({
  selector: 'app-result-box',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './result-box.component.html',
  styleUrls: ['./result-box.component.scss']
})
export class ResultBoxComponent {

  public playerService = inject(PlayerServiceService)
  public ytService = inject(YtApiServiceService)


  @Input()
  album?: string;
  @Input()
  nameSong?: string;
  @Input()
  artists?: Artist[];
  @Input()
  song : DTOsearch | undefined;

  play(){
    if(this.playerService.actualSong != undefined){
      this.ytService.getSong(this.song?.videoId).subscribe((song) => {
        this.playerService.setSong(song);
        this.playerService.playSong();
      })

    }


  }
}
