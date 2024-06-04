import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Artist, DTOsearch } from '../../../models/DTO/DtoSearch';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { PlayerServiceService } from '../../../services/player-service.service';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-result-box',
  standalone: true,
  imports: [CommonModule,MatIconModule, RouterModule, TranslateModule],
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
  @Input()
  type: string = '';

  ngOnInit(): void {

  }

  play(){
    if(this.playerService.actualSong != undefined){
      this.ytService.getSong(this.song?.videoId).subscribe((song) => {
        this.playerService.setSong(song);
        this.playerService.playSong();
      })
    }
  }
}
