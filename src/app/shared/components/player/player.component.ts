import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { QueueSongComponent } from '../queueSong/queueSong.component';
import { PlayerServiceService } from '../../../services/player-service.service';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'playerSide',
  standalone: true,
  imports: [MatIconModule, QueueSongComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {


  constructor(private playerService : PlayerServiceService, private ytApiService: YtApiServiceService) { }


  playSong(){


    // TODO : QUITAR ESTE GET 

    this.ytApiService.getSong("rO1ANdXvdTg").subscribe((res) => {
      this.playerService.playSong(res);
    })

  }

}
