import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Artist, DTOsearch } from '../../../models/DTO/DtoSearch';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { PlayerServiceService } from '../../../services/player-service.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-result-box',
  standalone: true,
  imports: [CommonModule,MatIconModule, RouterModule],
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
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.song);
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
